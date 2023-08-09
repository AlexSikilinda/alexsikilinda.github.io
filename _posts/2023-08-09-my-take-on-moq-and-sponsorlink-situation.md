---
layout: post
title: "My take on Moq and SponsorLink situation"
date: 2023-08-09 00:00:01
comments: true
analytics: true
tags: .NET C# OSS NuGet
---

<img src='/public/images/Moq420.png' alt="moq library integration with SupportLink with 'I find it wrong' phrase"/>

Moq is a popular .NET library primarily used for unit testing. Distributed as a NuGet package, its main purpose is to help with mocking dependencies, a technique heavily used to test small blocks of code in isolation.

To many developers' surprise, there is a new proprietary dll included in the latest `4.20` package version. The dll contains the code of [SponsorLink](https://github.com/devlooped/SponsorLink), a new tool developed by the Moq's author that tries to facilitate Open Source Projects support. It does it by reading email addresses from local git configs, and although it is claimed [users' privacy is respected](https://github.com/devlooped/SponsorLink), many people still find this practice wrong, dubious or even borderline illegal.
<br>

## What do I think?

I don't think the step itself was ill-intended, but I do think it was wrong. Moq `4.20` registers a 3rd party analyzer that reads my local git email without my consent - everything here sounds wrong to me. I expect these kinds of things to be absolutely transparent, with a clear way to disable it if I want. Unfortunately, it's not the case with SponsorLink.

SponsorLink addition was transparent to some degree, we have [a blog post from the author](https://www.cazzulino.com/sponsorlink.html), but when I install a NuGet package, the only thing I want to be added to my project is the code of the package. A 3rd party binary that reads my personal info (even if it doesn't share it) is not a definition of trust I want to have with someone else's code running in my application.

Having said that, I think we all need to appreciate the work being done by all open-source contributors and maintainers. They do it for free, in their own time and it would be crazy for us to blame them, even if we don't agree with some decisions.

## What do other people think?

People are not very happy. StackExchange.Redis, also a popular open-source library [switched to NSubstitute](https://github.com/StackExchange/StackExchange.Redis/pull/2522):


> [...] I don't want to risk an upgrade and harvesting PII from anyone who works on our project, so I'm removing Moq immediately. [...]
>
> <cite> [The PR's description](https://github.com/StackExchange/StackExchange.Redis/pull/2522#issue-1842301625) </cite>

Marc Gravell, an author and maintainer of various popular open-source projects, gave a broader answer on switching to `NSubstitute`:

> I genuinely do understand the frustration of struggling to get proper support for library authors; I work on many popular libraries (Dapper, StackExchange.Redis, protobuf-net, etc), with combined well over 1 billion downloads on nuget - and I get only a tiny trickle of support. So yes, I get the motivation, but: this was a massive misstep that utterly undermines consumer confidence. Trust is hard to earn, and easy to lose, and: you burned it wantonly here, sorry.
>
>[...]
>
> <cite> [Marc Gravell's answer](https://github.com/StackExchange/StackExchange.Redis/pull/2522#issue-1842301625) </cite>

Miguel de Icaza commented this way:

> One interesting feature about Swift’s package manager is that it uses a sandbox to avoid this kind of covert data exfiltration that has the community pretty pissed.
>
> This sort of design flaws is what SolarWinds exploited: build systems that run third party unknown code.
>
>And as an industry, the reaction to this well known attack vector has been a corporate shrug.  
>
>Fixing this for ecosystems that have these open wounds will take decades.
>
>Some background on the issue of the day. 
>
>The reality is that NuGet (and every other package manager) needs to adopt something like SwiftPM’s sandbox.
>
>I would also love to see our industry bake-in a way into the official package managers to support OSS development.
>
><cite> [Miguel de Icaza's twitter](https://twitter.com/migueldeicaza/status/1689229351424815104?s=20) </cite>

## What is our team doing?

We are going to use a previous version of Moq and consider moving to **NSubstitute**, depending on how the situation develops. I still think **Moq** is a great library we've been using for years and I hope our community will find a way to restore the trust.

## Useful links

- [Official discussion](https://github.com/moq/moq/issues/1374)
- [Original issue](https://github.com/moq/moq/issues/1372)
- [Reddit post](https://www.reddit.com/r/dotnet/comments/15ljdcc/does_moq_in_its_latest_version_extract_and_send/)
- [Moq author's blog](https://www.cazzulino.com/sponsorlink.html)
- [Public samples, issues and discussions repo for SponsorLink](https://github.com/devlooped/SponsorLink)
- [NSubstiture repo](https://github.com/nsubstitute/NSubstitute)




