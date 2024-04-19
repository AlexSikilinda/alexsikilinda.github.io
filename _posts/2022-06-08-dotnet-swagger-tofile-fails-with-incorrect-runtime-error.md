---
layout: post
title: "'dotnet swagger tofile' command fails with 'incorrect runtime' error"
date: 2022-06-08 00:00:01
tags: .NET Swagger OpenAPI Quickfix
comments: true
analytics: true
---

<img src='/public/images/swaggerMainPage.png' alt="openapi swagger swaggerui swashbuckle"/>

I have come across a rather nasty bug: after a successful build of our ASP.NET 5 app, we generate a swagger file using `Swashbuckle.AspNetCore.Cli` tool with `dotnet swagger tofile` command. This is set up as a postbuild event. Unfortunately, it doesn't work on my machine, but it does work completely fine on my colleague's machine.

**UDPATE (4/20/2024):** if you encounter this error with .NET 8 - read [my new post addressing this issue](/posts/dotnet-swagger-tofile-dotnet-8/).
<br>

The post build error I am getting is something like this:

{% highlight console %}
The command "dotnet swagger tofile --output \swagger.json bin\Debug\net5.0\myapi.dll v1 " exited with code -532462766.
{% endhighlight %}

The error itself is not too useful, so the next place to check is the build output window. And it helps a bit:

{% highlight console %}
Tool 'swashbuckle.aspnetcore.cli' (version '6.2.3') was restored. Available commands: swagger

Restore was successful.
Unhandled exception. System. IO. FileLoadException: Could not load file or assembly 'System. Runtime, Version=6.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'. The located assembly's manifest definition does not match the assembly reference. (0x80131040)
{% endhighlight %}

But it doesn't solve our issue. A natural step would be to go and install .NET 6 SDK since it seems it's missing somehow, but you would see it doesn't help. In fact, .NET 6 **had been** installed already, and this is what causes my swagger file generation to fail (and it also explains why it works on another machine - it actually **doesn't have** .NET 6 installed).

So the reason is `dotnet` version mismatch, our project targets ASP.NET 5, but .NET CLI uses the latest SDK by default (in my case it was .NET 6). That is why we get this a bit tricky, but actually meaningful `System.Runtime` message.

## Quickfix

The solution here is to add [**global.json**](https://docs.microsoft.com/en-us/dotnet/core/tools/global-json) to your working directory (solution folder will work too):

{% highlight json %}
{
"sdk": {
"version": "5.0.406",
"rollForward": "latestPatch"
}
}
{% endhighlight %}

This file will instruct .NET CLI to use version 5.0.406 or a bigger minor version. And now it works! Hopefully, it helps you too.

## Useful tips

- check your `.config/dotnet-tools.json` tools-manifest file, to see which `Swashbuckle.AspNetCore.Cli` version is used
- try updating `Swashbuckle.AspNetCore.Cli` to the latest version available
- update all the `Swachbuckle` nuget packages
- use `dotnet --info` command to check the .NET CLI version used
- use `dotnet --list-sdks` to list all installed SDKs
- update your project to the latest .NET version
