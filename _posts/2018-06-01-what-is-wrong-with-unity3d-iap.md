---
layout: post
title:  "What is wrong with Unity3D IAP"
date:   2018-06-01 12:22:00
tags: .Net Unity3D
comments: true
analytics: true
---

<img src='/public/images/UnityIAPDemoCode.png' alt="visual studio on mac os"/>

I've been working with Unity3D IAP plugin recently (it allows us to work with in-app purchases directly from unity). I think it could be better.
At first, let me say it, Unity3D is a very good product, and Unit3D IAP is a great plugin too. I'm writing this
not because I want to show how bad it is (it is a great idea, we need this!), but because I hope someone from Unity team can have fresh look at all these things and maybe avoid these mistakes in future.
<br>
## Naming conventions

My biggest concern in Unity3D is code formating and style. C# (.NET) has [naming guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/naming-guidelines) which are followed in the whole .NET framework and majority 
of .NET libraries. They are taken from my favorite book about .NET - [Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries](https://www.informit.com/store/framework-design-guidelines-conventions-idioms-and-9780321545619). 

Unity doesn't follow this conventions unfortunately. As we know, there were three languages supported by the engine intially - C#, JavaScript, Python. This is probably the reason why
we have camel cased public variables, properties and even methods' names (they all should be [pascal cased](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/capitalization-conventions)). 

I understand that it's impossible to fix old code, but, since Unity's only programming language is C# now, I supposed that at least all new code will follow these guidelines. I would even be okay if Unity had it's own conventions. But currently it's just inconsistent. Again, I am talking only about new code here.

Let's consider `IAPDemo.cs`, which is a part of the IAP package:
<script src="https://gist.github.com/AlexSikilinda/20b745bfa21b7f6b9393bc51f7459eaf.js"></script>

There are four(!) different naming conventions in one mehtod here: camel case `info.getProductId()`, pascal case `void OnInitialized`, hungarian notation `m_Controller` and snake case `Dictionary<string, string> introductory_info_dict`. Only the pascal case is correct here; snake case and hungarian notation should not be used in C# at all; camel case should be used only for local and private variables, all methods should be pascal cased - `info.GetProductId()` etc.

## Class design

Let's take a look at `info.getProductId()`, `info.getPurchaseDate()`, `info.isSubscribed()` etc. If it was written by a Java programmer, it would be perfectly okay. But in C# it is wrong. As we said, capitalization is incorrect, it should be `info.GetProductId()`, `info.GetPurchaseDate()`, but it also doesn't seem right. These methods should really be properties, so I would like to have smth like `info.ProductId`, `info.PurchaseDate` etc.

If you check the return type of `SubscriptionInfo` methods, you will see that a lot of them return `Result` type, which can be either `True`, `False` or `Unsupported`. There is no official documentation yet, but there is [a draft on unity forum](https://forum.unity.com/threads/improved-support-for-subscription-products.532811/), and mostly it says `Non-renewable Products in the Apple store return a Result.Unsupported value.`, `Auto-renewable Products in the Apple store and subscription products in the Google Play store return a Result.True or Result.False value.`. I think a better design would be introducing two separate classes for non-renewable and auto-renweable products, e.g. `NonRenweableSubscriptionInfo` and `AutoRewnewableSubscriptionInfo` (the later can inherit the former). In this case only `AutoRewnewableSubscriptionInfo` would have all `.isSubscribed()`, `.isExpired()`, `.isCancelled()` methods and they could return regular `bool`, which is much easier to work with.

## SOLID Principles

Let's revise some of SOLID principles. "S" stands for "Single Responsibility" (a class should be responsible only for one thing), "I" for "Interface Segregation" (it's better to have a lot of small interfaces, than one which has everything).

Now let's consider [`IStoreListener`](https://docs.unity3d.com/ScriptReference/Purchasing.IStoreListener.html) interface. IMO, it violates both of the above principles. It should be segregated into two separate interfaces `IStoreInitializator` and `IStorePurchaseProcessor`. If I just want to react on a product purchase (`ProcessPurchase` method) why do I need to implement `OnInitialized` and `OnInitializeFailed`? 

It's not a breaking change to introduce these two interface, and it could potentially simplify some workflows.

## Better documentation
Currently we have 900 lines `IAPDemo.cs` file with a lot of preprocessor directives which has all examples of plugin usage. It's really hard to understand what is going on there, especially for a novice. I would rather have separate files for each feature, e.g. `AutoRenewableSuscriptionDemo.cs`,
`NonRenewableSuscriptionDemo.cs`, `ConsumableProductDemo.cs` etc. It would really help.


## What can Unity team do?

* Fix "fresh code" (subscription support) so that it corresponds to naming guidelines, it can be done now because noone has used it yet
* Consider introducing more classes for non-renewable and auto-renewable subscriptions so that we have more object oriented design
* Consider introducing more granular interfaces, e.g. `IStoreInitializator` and `IStorePurchaseProcessor`
* Provide more granular examples instead of gigantic `IAPDemo.cs`
* Consider doing public API reviews, as .NET framework team does to get early feedback 

I can be wrong, I just started working with Unity IAP and don't know enough about all IAP busines logic for various stores, and this is just an attempt to make Unity IAP a little bit better.

So that's it. 

