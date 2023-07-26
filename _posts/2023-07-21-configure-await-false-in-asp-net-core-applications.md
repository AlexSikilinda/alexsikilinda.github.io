---
layout: post
title: ".ConfigureAwait(false) in ASP.NET Core applications"
date: 2023-07-21 00:00:01
tags: .NET C# ASP.NET
comments: true
analytics: true
---

<img src='/public/images/ConfigureAwaitFalse.png' alt="Async code with ConfigureAwaitFalse"/>

Using `.ConfigureAwait(false)` is considered good practice for asynchronous .NET Framework code in general and **legacy ASP.NET** in particular.

Sometimes people (and tools) insist on using `.ConfigureAwait(false)` in **ASP.NET Core** applications too.

The purpose of this article is to provide a set of useful links and quotes to show that `.ConfigureAwait(false)` does nothing in **ASP.NET Core** and therefore can be omitted in web applications utilizing modern .NET versions.
<br>

## TLDR

> `ConfigureAwait(false)` is used to avoid forcing the callback to be invoked on the original context or scheduler.
>
> <cite>[ConfigureAwait FAQ](https://devblogs.microsoft.com/dotnet/configureawait-faq/)</cite> by Stephen Toub

> There isn’t a `SynchronizationContext` in ASP.NET Core.
>
> [...]
>
> Since there is no context anymore, there’s no need for `ConfigureAwait(false)`. Any code that knows it’s running under ASP.NET Core does not need to explicitly avoid its context. In fact, the ASP.NET Core team themselves have dropped the use of `ConfigureAwait(false)`.
>
> <cite>[ASP.NET Core SynchronizationContext](https://blog.stephencleary.com/2017/03/aspnetcore-synchronization-context.html)</cite> by Stephen Cleary

## Why we need .ConfigureAwait(false) in the "old" ASP.NET?

Actually, we do not:

> If an app model / environment (e.g. Windows Forms, WPF, ASP.NET Core, etc.) publishes a custom `SynchronizationContext`, there’s almost certainly a really good reason it does: it’s providing a way for code that cares about synchronization context to interact with the app model / environment appropriately. So if you’re writing an event handler in a Windows Forms app, writing a unit test in xunit, writing code in an ASP.NET MVC controller, whether or not the app model did in fact publish a `SynchronizationContext`, you want to use that `SynchronizationContext` if it exists. And that means the default / `ConfigureAwait(true)`.
>
> [...]
>
> **If you’re writing app-level code, do not use `ConfigureAwait(false)`**.
>
> <cite>[ConfigureAwait FAQ](https://devblogs.microsoft.com/dotnet/configureawait-faq/)</cite> by Stephen Toub

So why people still may do it in legacy ASP.NET? Two reasons. The first one is a small **performance improvement**:

> There is a cost to queueing the callback rather than just invoking it, both because there’s extra work (and typically extra allocation) involved.
>
> [...]
>
> For very hot paths, even the extra costs of checking for the current `SynchronizationContext` and the current `TaskScheduler` (both of which involve accessing thread statics) can add measurable overhead. If the code after an await doesn’t actually require running in the original context, using `ConfigureAwait(false)` can avoid all these costs: it won’t need to queue unnecessarily, it can utilize all the optimizations it can muster, and it can avoid the unnecessary thread static accesses.
>
> <cite>[ConfigureAwait FAQ](https://devblogs.microsoft.com/dotnet/configureawait-faq/)</cite> by Stephen Toub

This means adding `ConfigureAwait(false)` will slightly improve your APIs/web app performance, but the effect will be only noticeable for high-load applications.

The second reason is more subtle. `ConfigureAwait(false)` can help you **avoid deadlocks**. While this is exactly the reason **library-level code** should use `ConfigureAwait(false)` when possible, using this mechanism to avoid deadlocks in your **app-level code** indicates a problem with asynchronous code in your application. `ConfigureAwait(false)` can help here too, but the proper fix is the correct use of `async/await` with no blocking calls in asynchronous code.

## So we do not need .ConfigureAwait(false) in .NET Core?

No, `.ConfigureAwait(false)` is still used in **.NET Core** the same way it's used in .NET Framework. You do not need `.ConfigureAwait(false)` in **ASP.NET Core** because there is no `SynchronizationContext`, but even with ASP.NET Core you may need it if the same code is used in other apps (e.g. desktop or classic ASP.NET).

> If you have code in a library that may also run in a UI app, or legacy ASP.NET app, or anywhere else there may be a context, then you should still use ConfigureAwait(false) in that library.
>
> <cite>[ASP.NET Core SynchronizationContext](https://blog.stephencleary.com/2017/03/aspnetcore-synchronization-context.html)</cite> by Stephen Cleary

## More info

My task here wasn't to explain how `.ConfigureAwait` and `async/await` work, but rather to give a high-level overview of the way we should use it.

However, if you want to actually understand what's going on, here are the links you can use:

- [ConfigureAwait FAQ](https://devblogs.microsoft.com/dotnet/configureawait-faq/) - great in-depth overview by a Microsoft developer who works on .NET platform
- [ASP.NET Core SynchronizationContext](https://blog.stephencleary.com/2017/03/aspnetcore-synchronization-context.html) - an article by Microsoft MVP who is an expert on asynchronous operations
- [Best practice to call ConfigureAwait for all server-side code](https://stackoverflow.com/questions/13489065/best-practice-to-call-configureawait-for-all-server-side-code) - very useful StackOverflow discussion
- [Async in ASP.NET](https://learn.microsoft.com/en-us/events/aspconf-aspconf/async-in-asp-net) - a video from ASP.NET team discussing async in classic ASP.NET
- [Parallel Computing - It's All About the SynchronizationContext](https://learn.microsoft.com/en-us/archive/msdn-magazine/2011/february/msdn-magazine-parallel-computing-it-s-all-about-the-synchronizationcontext) - a deep-dive on `SynchronizationContext`

## Summary

- No need for `.ConfigureAwait(false)` in ASP.NET Core in most cases.
- `.ConfigureAwait(false)` is still useful in .NET Core for applications utilizing `SynchronizationContext`.
- `.ConfigureAwait(false)` is useful in classic ASP.NET, but not strictly required with proper use of `async/await` pattern.
- Consider using `.ConfigureAwait(false)` in asynchronous code used by other applications.
- `.ConfigureAwait(false)` can help avoid deadlocks if asynchronous code is invoked synchronously.
- `.ConfigureAwait(true)` is a default behavior, so adding it doesn't change anything.
