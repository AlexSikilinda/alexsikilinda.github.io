---
layout: post
title: "MyGet outage"
date: 2023-07-27 00:00:01
tags: SaaS DevOps NuGet
comments: true
analytics: true
---

<img src='/public/images/MyGetAllSystemDown.png' alt="screenshot of myget status page showing all systems are down"/>

Let's face it, all software fails at some point. We've seen it in AWS, we've seen it in Azure. Bitbucket Pipelines, GitHub Actions, Windows, Mac, Linux even [the program which put a man on the Moon](https://en.wikipedia.org/wiki/Apollo_Guidance_Computer#1201_and_1202_program_alarms), everything failed or crushed or glitched. Not constantly, but I think it wouldn't be too hard to name a few episodes where your software just didn't work for some time.

We, ourselves, probably wrote some programs which didn't do what expected. And even though it's our responsibility as developers to ensure the highest standard of quality in our product, failures are more or less inevitable. So the main question is not "Why it happened and who's to blame?" but rather "How do we handle it correctly and recover as fast as we can?".

For the past 30+ hours MyGet has been down. With no communication, no updates nor even a small glimpse of what's going on and when it will be resolved, the team behind MyGet (if there is one?) showed us how to **not** handle failures in a system that some would consider business critical.
<br>

## What is MyGet?

MyGet is a private company and a tool that allows storing NuGet packages in so-called private feeds. Software teams can pack their code and push it to MyGet so that anyone _who's authorized_ can access and use it.

In contrast, the official package manager NuGet.org is a public feed, where anyone can access code that has been pushed.

## Why is MyGet (or any other private feed you use) critical for your software?

Understandably, a lot of companies do not want to have their code accessible by anyone but still want to share it internally or with a small set of customers. That's why a private feed is used. That also means your software starts to _depend_ on the feed. You can't really build/deploy/develop/fix/test/hotfix your product unless the private feed is alive and healthy. You can't really do anything unless you find a way to get the package you use from an alternative source, but the nature of private feeds suggests it should be the only place you store your precious code. This means your private feed is a **single, critical** dependency of your product.

## What is the impact of MyGet outage?

Again, teams who use MyGet to store or pull NuGet packages are not able to do it, which, in most cases, means the development process is stalled. Not only the development, but even potentially critical hotfixes are in danger since you can't build and deploy your project. Of course, the package may be found in your local Nuget cache, but I wouldn't rely on such a random mechanism as cache.

## Mitigations

There are a few potential mitigations:

- Abandoning affected NuGet packages and using the source code directly. This will only work if you both generate and consume the packages. Of course, this will lead to code duplication and maintainability problems, but it could be a viable option if you don't have time for migrations to other private feeds.
- Migration to an alternative private feed. The way to go if you don't trust your current private feed anymore and consider the new one more robust and reliable. The migration can be challenging and time-consuming since you will need to modify all CI/CD scripts, nuget configs and potentially coordinate simultaneous updates of all apps. Also, if your current feed is down, you won't be able to get your previous packages and may need to either rebuild all the packages from the corresponding source code or get the packages from the local nuget cache and push them manually.
- Wait till MyGet is fixed. But what if MyGet isn't going to be fixed anytime soon or your existing packages are lost somehow? Since it's been 30+ hours and there was no official communication, everything is possible. But also this is the easiest option since the only thing you need to do is wait.

## What are the alternatives to MyGet?

[The official documentation](https://learn.microsoft.com/en-gb/nuget/hosting-packages/overview) lists a lot of software for private feed hosting, but before we pick the winners, let's discuss what we want from our private feed.

First of all, there are two types of private feed solutions: self-hosted and SaaS. Even though a self-hosted private feed may be a reliable and fast solution for storing nuget packages, the required infrastructure, maintenance and time make this option less appealing. Also, the official NuGet.Server implementation uses .NET Framework, which is, let's face it, a bit outdated, and not everyone wants to spend time dealing with .NET Framework, IIS and so on.

That leaves us with SaaS solutions. Given our current experience with MyGet, we probably want a big company with great support behind it. My options here are:

- Azure Artifacts
- GitHub package registry
- GitLab Package Registry
- AWS CodeArtifact

Even though I always lean towards Microsoft projects when working with .NET, I think all of the above would do just fine.

## Why it may be the end for MyGet?

To end this bigger-than-expected article, let's reflect on the reason this outage may be the end for MyGet. I don't actually think it's the time it's taking to recover, but rather the absence of clear communication and transparency which jeopardizes maybe the most important SaaS product's aspect - client trust. I think it's time to migrate.
