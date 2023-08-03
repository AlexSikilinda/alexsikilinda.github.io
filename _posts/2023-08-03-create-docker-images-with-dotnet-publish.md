---
layout: post
title: "Create docker images with dotnet publish"
date: 2023-08-03 00:00:01
comments: true
analytics: true
tags: DevOps .NET C# Docker
---

<img src='/public/images/dotnetCli/DotnetPublish.png' alt="dotnet publish command generating a docker image which can be send to AWS ECR, Azure Container Registry, Docker Hub, Google Code Artifacts etc."/>

Docker is a very convenient tool for writing, testing and especially for deploying software. Wide adoption of Docker Containers by all Cloud Providers has made it the default approach for enterprise software deployments.

Historically we have been using a combination of `Dockerfile` and `Docker CLI` to build and publish **docker images**. Starting with **.NET 7**, we can achieve the same by using `dotnet publish` command.

Today we are exploring how to containerize a .NET application with `dotnet publish`, configure it inside `.csproj` file and publish to the local Docker Desktop.
<br>

## Prerequisites

To build a docker image with `dotnet publish` you are going to need **.NET 7 SDK**. You can always check which SDKs are installed by running `dotnet --info` command in your console.

To store and run our image locally, **Docker Desktop** needs to be installed on your machine.

## Microsoft.NET.Build.Containers NuGet package

Before we can run `dotnet publish`, we need to add `Microsoft.NET.Build.Containers` nuget package to the project we want to publish.

That's it, we can now use .NET CLI to produce a docker image with our app, but before we do it, let's discuss how we can customize the image.

## Docker image configuration with `dotnet publish`

Usually, when working with docker directly, we can customize our image by adjusting the `Dockerfile` or supplying additional arguments to `docker build` command. Since we don't have a `Dockerfile` nor do we use `docker build`, the "standard" way of tweaking the image generation will not work for us.

Fortunately, we can provide some instructions for `dotnet publish` inside our `.csproj` file. For example, we can customize the **image name** by adding `<ContainerImageName></ContainerImageName>` element. We can also use `<ContainerImageTag></ContainerImageTag>` to set an **image tag**, which will help us to version our containers. 

The full list of configurable parameters can be found in the [official documentation](https://learn.microsoft.com/en-us/dotnet/core/docker/publish-as-container#configure-container-image).

For our demo, let's set the name to `hello-world-dotnet-publish` and the tag to `1.0.0`. Our `.csproj` now looks like this:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <ContainerImageName>hello-world-dotnet-publish</ContainerImageName>
    <ContainerImageTag>1.0.0</ContainerImageTag>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Build.Containers" Version="7.0.306" />
  </ItemGroup>

</Project>
```

## Publishing images to local docker daemon

With the NuGet package installed and the image reasonably configured in `.csproj` file, we can now publish the app to our local Docker Desktop. Execute the following command in your console window from your solution directory:

```bash
dotnet publish --os linux --arch x64 -p:PublishProfile=DefaultContainer -c Release
```

As you can see, we instruct `dotnet publish` to use `linux` container for `x64 architecture` with the build in `Release` configuration. Most of the time, these are the defaults you are going to use. `-p:PublishProfile=DefaultContainer` is a parameter we need to pass to build ASP.NET apps. For other types of apps, replace it with `/t:PublishContainer` parameter.

<img src='/public/images/dotnetCli/DotnetPublishConsoleResult.png' alt="dotnet publish command pushing a docker image in local daemon"/>

And we get the confirmation, our first docker image generated with `dotnet publish` is pushed to our local Docker Desktop:

```console
Pushed container 'hello-world-dotnet-publish:1.0.0' to local daemon
```

<img src='/public/images/dotnetCli/DockerDesktopWithOurImage.png' alt="docker desktop with an image"/>

## Common `docker publish` errors

There are a couple of errors you may encounter working with `docker publish`.

```console
error MSB4057: The target "PublishContainer" does not exist in the project.
```

`Error MSB4057` indicates `Microsoft.NET.Build.Containers` nuget package is missing from the project you are trying to publish.

```console
error CONTAINER1012: The local daemon is not available, but pushing to a local daemon was requested. Please start the daemon and try again.
```

`error CONTAINER1012` indicates your local Docker Desktop is not running.

## Summary

- `dotnet publish` is a convenient way of creating Docker images.
- **.NET 7 SDK** is needed to generate images with dotnet CLI.
- Porjects being published need to reference `Microsoft.NET.Build.Containers` nuget package
- **Docker Desktop** needs to be running if you are publishing to local daemon.
- Configuration of the image is done through `.csproj` file.

In the next article we are going to review how to push our Docker image to Azure Container Registry. 








