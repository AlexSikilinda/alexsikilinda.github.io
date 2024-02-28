---
layout: post
title: "The Microsoft Store is experiencing network issues"
date: 2024-02-25 00:00:01
comments: true
analytics: true
tags: UWP
---

<img src='/public/images/TheMicrosoftStoreIsExperiencingNetworkIssues.png' alt="A Visual Studio 2022 modal window saying the microsoft store is experiencing network issues while trying to associate an app with microsoft store app"/>

There is a problem with publishing apps to Microsoft Store which basically blocks any new submissions at this point.
If you try to "Associate the app with the Store..." in your Visual Studio you will get an error saying **The Microsoft Store is experiencing network issues**.

Even though I've tried all workarounds I can think of (Upgrading VS to the latest 17.9.1 version, clearing all kinds of caching, windows credentials, signing out from VS etc), nothing seems to help.
If you are experiencing the same - go to [this issue](https://developercommunity.visualstudio.com/t/The-microsoft-store-is-experiencing-netw/10586108?space=41&sort=newest) on the Microsoft Developer Community portal, vote for it and leave a comment.

So far no workarounds have been provided by Microsoft and it really seems like the problem is on their side.

I'll update the post once we have a solution.

**UPDATE:** the workaround for now is to use a US VPN. Although we are still waiting for MS fix for non-VPN access.