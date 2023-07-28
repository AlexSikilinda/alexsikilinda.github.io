---
layout: post
title: "How to push NuGet packages to Azure Artifacts from Bitbucket Pipelines"
date: 2023-07-28 00:00:01
tags: DevOps Bitbucket NuGet
comments: true
analytics: true
---

<img src='/public/images/bitbucketNugetPackage/PriavteNugetPackageInAzureArtifacts.png' alt="azure devops portal with a private nuget package"/>

After the recent [MyGet outage](https://sikilinda.com/posts/myget-outage/), some of their users are going to be migrating to other private feed services. Major git repo hosting providers, such as GitHub, GitLab, or Azure DevOps have built-in support for NuGet private feeds, unfortunately it is not the case for Bitbucket Pipelines. So developers who use Bitbucket Pipelines for their CI/CD will need to utilize 3rd party services to store NuGet packages privately.

This article demonstrates how to use Azure Artifacts private feeds from Bitbucket Pipelines. We explore how we can authenticate, push and pull packages from the Pipelines, as well as locally.
<br>

## Packaging .NET code to a NuGet package

We can generate a NuGet package from .NET code either by enabling _Produce a package file during build operations_ under _Project properties > Package > General_ or by running the [dotnet pack](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-pack) tool.

The second option gives us more control so we are going to use it. An example command that packs `SecretCodeLibrary.csproj` from the `SecretCodeLibrary` folder in the `Release` configuration and generates a NuGet package in the current folder with `1.0.42` version:

```sh
dotnet pack SecretCodeLibrary/SecretCodeLibrary.csproj -o . --configuration Release -p:Version=1.0.42
```

The result of the command - file with `.nupkg` extension:

<img src='/public/images/bitbucketNugetPackage/NugetPackageGenerated.png' alt="content of a folder with .NET solution source code and NuGet package after dotnet pack command"/>

## Creating a private feed in Azure Artifacts

Now it's time to create a private feed in Azure Aritfacts so that we can push and pull our newly created NuGet package.

Go to your [Azure DevOps](https://azure.microsoft.com/en-us/products/devops), select a project and navigate to _Artifacts_ in the main menu:

<img src='/public/images/bitbucketNugetPackage/AzureArtifactsScreen.png' alt="azure devops artifacts screen"/>

You should be able to click **Create Feed** button, and after providing a descriptive name, your new Azure Artifacts private feed is created.

In this article I created a project scoped feed, but feel free to use organization scoped feed if you want to broader access for your teams.

## Connecting to the private feed from your local environment

Before accessing Azure Artifacts from your local environment we need to make sure the necessary tools are installed.

We need .NET Core SDK 2.1.400+, which I assume you already have installed since you've built your package. But just in case, [here is the link](https://dotnet.microsoft.com/en-us/download). Get the latest 6.0.x since according to the documentation, the credential provider needs 6.0 SDK.

Install [the credential provider](https://github.com/microsoft/artifacts-credprovider#azure-artifacts-credential-provider). For Windows, the only thing needed is this command executed from powershell:

```shell
iex "& { $(irm https://aka.ms/install-artifacts-credprovider.ps1) }"
```

Once we have the tools installed, let's follow the instruction we have in the "Connect to feed" screen:

<img src='/public/images/bitbucketNugetPackage/DotNetFeedConnection.png' alt="azure devops artifacts screen"/>

Let's add the `nuget.config` we have in the first block to the root folder with our `.sln` file. My file looks like this, but yours will differ a little bit:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="PrivateArtifactsFeed" value="https://mobile-kingdom.pkgs.visualstudio.com/ArtifactsDemo/_packaging/PrivateArtifactsFeed/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

Let's try to push our package with the following command (`--api-key` is required, but the actual parameter is not used, can be any random string):

```
dotnet nuget push --source "PrivateArtifactsFeed" --api-key az SecretCodeLibrary.1.0.42.nupkg
```

And we get this result:
<img src='/public/images/bitbucketNugetPackage/SuccessfulNugetPackagePush.png' alt="console window indicating Nuget package was successfuly pushed to Azure Artifacts"/>

As you can see, the tool was able to silently authenticate using the Microsoft Authentication Library (MSAL):

```
[CredentialProvider]VstsCredentialProvider - Acquired bearer token using 'MSAL Silent'
```

Since my local Windows user is the same one I used to create the feed, the authentication process happened automatically.

Let's go back to the Azure DevOps portal and see if we can locate the new package. And indeed, we can:
<img src='/public/images/bitbucketNugetPackage/PriavteNugetPackageInAzureArtifacts.png' alt="azure devops portal with a private nuget package"/>

## Consuming private packages from Visual Studio

So far we were able to create the private feed and access it locally from the command line. To finish our local environment setup we need to make sure we can work with Azure Artifacts from Visual Studio:

<img src='/public/images/bitbucketNugetPackage/VisualStudioPrivatePackage.png' alt="Visual Studio displaying a nuget package from Azure Artifiacts private feed"/>

Visual Studio automatically picks up `nuget.config` file we added earlier, so there's no additional configuration, since, again, we authenticate with the current Windows user.

You may have noticed that there's only one feed in Visual Studio NuGet Package Manager. It happens because in our `nuget.config` we have `<clear />` line, which clears all global feeds. Our private feed will use so-called [upstream sources](https://learn.microsoft.com/en-us/azure/devops/artifacts/concepts/upstream-sources?view=azure-devops) to fetch and cache the packages for public NuGet feed:

<img src='/public/images/bitbucketNugetPackage/AzureArtifactsUpstreamSource.png' alt="Azure Artifacts portal displaying Nuget public feed upstream source"/>

A single feed for a solution is considered a best practice, [read more here](https://learn.microsoft.com/en-us/azure/devops/artifacts/concepts/upstream-sources?view=azure-devops#use-a-single-feed-in-your-config-file).

## Pushing and pulling private NuGet packages in Bitbucket Pipelines

Bitbucket Pipelines is [an external source](https://learn.microsoft.com/en-us/azure/devops/artifacts/nuget/publish?view=azure-devops#publish-packages-from-external-sources), so we are going to authenticate using a [Personal Access Tokent or PAT](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows).

Go to **User Settings > Personal access tokens** in Azure DevOps and generate a new one with **Read & Write** packaging permissions:

<img src='/public/images/bitbucketNugetPackage/PersonalAccessTokenGeneration.png' alt="generating personal access token in azure devops"/>

Create a new **Repository Variable** in Bitbucket's Repository Settings called `ARTIFACTS_FEED_ACCESS_TOKEN` with the value you obtained in the previous step:

<img src='/public/images/bitbucketNugetPackage/BitbucketRepositoryVariable.png' alt="creating a new repository variable in bitbucket with azure artifacts personal access token or pat"/>

Do not store your PAT in your source code. PAT is a sensitive secret and storing secrets in your code is a bad practice. That's why we have just used **Repository Variables** to separate it from our codebase.

Now we can finally use this variable for our feed authentication inside our pipeline. Let's add the following step which programmatically replaces the nuget source from our local `nuget.config` with the same one, but the new source includes our PAT as the password (again, we are doing it only during the pipeline build, so the PAT never gets to the repo's source code):

```yaml
- step:
  name: "Push Nuget to Azure Artifacts"
  script:
    - dotnet nuget remove source PrivateArtifactsFeed
    - dotnet nuget add source https://mobile-kingdom.pkgs.visualstudio.com/ArtifactsDemo/_packaging/PrivateArtifactsFeed/nuget/v3/index.json --name PrivateArtifactsFeed --store-password-in-clear-text --username <YOUR_EMAIL> --password $ARTIFACTS_FEED_ACCESS_TOKEN
    - dotnet pack SecretCodeLibrary/SecretCodeLibrary.csproj -o . --configuration Release -p:Version=1.0.$BITBUCKET_BUILD_NUMBER
    - dotnet nuget push --source "PrivateArtifactsFeed" --api-key az SecretCodeLibrary.1.0.$BITBUCKET_BUILD_NUMBER.nupkg
```

You will need to change the feed URL with your own and provide a correct user name. Also, notice how we used `$ARTIFACTS_FEED_ACCESS_TOKEN` and `$BITBUCKET_BUILD_NUMBER` variables.

With this step add, you will be able to create a new NuGet package version and push it to your private Azure Artifacts feed each time the pipeline is run.
