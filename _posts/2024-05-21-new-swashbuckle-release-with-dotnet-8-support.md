---
layout: post
title: "New Swashbuckle release with .NET 8 support"
date: 2024-05-21 00:00:01
comments: true
analytics: true
tags: .NET Swagger
---

<img src='/public/images/2024/swashbuckle/SwashbuckleAspNetCoreCli.png' alt="swashbuckle nuget portal page with 6.6.1 release"/>

**Swashbuckle.AspNetCore** v6.6.1 was released recently, bringing native .NET 8 support and other improvements, so it's time to update if you [experienced related problems](/posts/dotnet-swagger-tofile-dotnet-8/) before.
<br>

## Why upgrade?

If you are using .NET 8 with an older version of Swashbuckle nuget package you may get an error similar to these:

```
You must install or update .NET to run this application.
App: C:\Users\username\.nuget\packages\swashbuckle.aspnetcore.cli\6.5.0\tools\net7.0\any\dotnet-swagger.dll
Architecture: x64
Framework: 'Microsoft.NETCore.App', version '7.0.0' (x64)
```

or

```
Error MSB3073 The command "dotnet swagger tofile --output swagger.json YouApp.dll v1 " exited with code -532462766.
```

or even something like

```
Unhandled exception. System. IO. FileLoadException: Could not load file or assembly 'System. Runtime, Version=6.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'. The located assembly's manifest definition does not match the assembly reference. (0x80131040)
```

Even though [there are some workarounds to make the older packages work with .NET 8](/posts/dotnet-swagger-tofile-dotnet-8/), updating Swashbuckle packages is the easiest way to handle this.

## How to upgrade Swashbuckle NuGet packages?

For projects referencing Swashbuckle package, you can use Visual Studio NuGet Package Manager to update them manually, or by executing this dotnet CLI command from the command line (make sure to update each **Swashbuckle.\*** package you reference!):

```
dotnet add package Swashbuckle.AspNetCore
```

Alternatively, we can also update the packages using this PowerShell command from the Package Manager Console in VS:

```
Update-Package Swashbuckle.AspNetCore
```

Or if you want to update all packages, just:

```
Update-Package
```

## How to upgrade Swashbuckle.AspNetCore.Cli?

If you are using **Swashbuckle.AspNetCore.Cli** dotnet tool for build-time swagger file generation or other purposes, you can update it by running this dotnet tool command:

```
dotnet tool install -g Swashbuckle.AspNetCore.Cli
```

This will [update (install)](https://github.com/domaindrivendev/Swashbuckle.AspNetCore?tab=readme-ov-file#swashbuckleaspnetcorecli) the latest version of **Swashbuckle.AspNetCore.Cli** globally.

However, for .NET 6+ projects, it's recommended to use local tools defined in the tool manifest (`dotnet-tools.json` file in `.config` folder). To update the local tool you can run this command in your root solution folder:

```
dotnet tool install Swashbuckle.AspNetCore.Cli
```

This command will upgrade the tool to the latest available version and change the `dotnet-tools.json` accordingly:

```json
{
  "version": 1,
  "isRoot": true,
  "tools": {
    "swashbuckle.aspnetcore.cli": {
      "version": "6.6.2",
      "commands": ["swagger"]
    }
  }
}
```

If you don't have `dotnet-tools.json` manifest, you can create one by executing this command in the root solution folder:

```
dotnet new tool-manifest
```

## Summary

- Keeping your NuGet packages up to date is a good practice to make sure you receive all the latest fixes and improvements.
- **Swashbuckle v6.6.\*** was released recently bringing better integration with .NET 8, especially for Swashbuckle.AspNetCore.Cli.
- You can update your Swashbuckle packages from VS NuGet Package Manager, dotnet CLI or PowerShell.
- It's recommended to use local tool manifest for .NET 6+ projects, you can update your local **swashbuckle.aspnetcore.cli** with `dotnet tool install Swashbuckle.AspNetCore.Cli` command, or update the global tool by adding `-g` flag - `dotnet tool install -g Swashbuckle.AspNetCore.Cli`.
