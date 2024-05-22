---
layout: post
title: "'dotnet swagger tofile' with .NET 8"
date: 2024-04-19 00:00:01
comments: true
analytics: true
tags: .NET Swagger OpenAPI Quickfix
---

<img src='/public/images/2024/csprojWithSwaggerPostBuild.png' alt="csproj file with postbuild event generate swagger document"/>

Generating an OpenAPI (Swagger) file during build time is a common scenario, usually done to generate the API client automatically. There are a few ways we can do it,
`dotnet swagger tofile` command from **swashbuckle.aspnetcore.cli** tool being one of them.

Usually, when migrating to a new major .NET version, [it's a good idea](https://sikilinda.com/posts/dotnet-swagger-tofile-fails-with-incorrect-runtime-error/) to update **dotnet-tools.json** config file to use the latest **swashbuckle.aspnetcore.cli**.

However, there is no new version of **swashbuckle.aspnetcore.cli** for .NET 8, moreover, there is a confusing statement about build-time swagger generation in the official ASP.NET documentation:

> Build-time OpenAPI document generation with Swashbuckle isn't supported in .NET 8 and later. [...] Run-time document generation is still supported in .NET 8.
>
> <cite>[Get started with Swashbuckle and ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio)</cite>

Let's review the problem and a solution.

**UDPATE (5/22/2024):** there is [a new release of Swashbuckle with .NET 8 support](/posts/new-swashbuckle-release-with-dotnet-8-support/), try getting the latest version if you encounter any problems.
<br>

## The problem

Building .NET 8 project with `dotnet swagger tofile` post build event will produce the following error:

```
Error MSB3073 The command "dotnet swagger tofile --output swagger.json YouApp.dll v1 " exited with code -532462766.
```

If you check the output logs or run the command value there will be more visibility into this:

```
You must install or update .NET to run this application.
App: C:\Users\username\.nuget\packages\swashbuckle.aspnetcore.cli\6.5.0\tools\net7.0\any\dotnet-swagger.dll
Architecture: x64
Framework: 'Microsoft.NETCore.App', version '7.0.0' (x64)
```

So it tries to run the tool with .NET 7 in .NET 8 "context" which causes some issues.

## A quick fix

There is an environment variable that instructs **swashbuckle.aspnetcore.cli** to run on the latest .NET available - `DOTNET_ROLL_FORWARD=LatestMajor`.

You can also add it to your post-build events by replacing this:

```
<Exec Command="dotnet swagger tofile --output ./swagger.json $(OutputPath)/$(AssemblyName).dll v1" />
```

To this:

```
<Exec Command="dotnet swagger tofile --output ./swagger.json $(OutputPath)/$(AssemblyName).dll v1" EnvironmentVariables="DOTNET_ROLL_FORWARD=LatestMajor"/>
```

For me, and based on [this GitHub issue](https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/2707), for others too, it works great. There is still a concern, however, if it will be the case in the future, especially with the note in official documentation saying it's not supported starting with .NET 8. So we may start looking at alternative solutions for build-time swagger file generation, which we'll cover in the next article.

For now, `DOTNET_ROLL_FORWARD=LatestMajor` will do the trick.

## Summary

- **swashbuckle.aspnetcore.cli** does not support .NET build-time document generation "officially", however, we can make it work with `DOTNET_ROLL_FORWARD=LatestMajor` environment variable.
- Check your `.config/dotnet-tools.json` tools-manifest file, to see which `Swashbuckle.AspNetCore.Cli` version is used. The latest one for now is **v6.5.0**.
- Try updating `Swashbuckle.AspNetCore.Cli` to the latest version available.
- Consider switching to another method of build-time swagger generation given it's unclear if `Swashbuckle.AspNetCore.Cli` will work in the future.
- You can also review [my older post](https://sikilinda.com/posts/dotnet-swagger-tofile-fails-with-incorrect-runtime-error/) on the same topic.
- Read [the official ASP.NET Swagger documentation](https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio).
- [This GitHub issue](https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/2707) has more details.
