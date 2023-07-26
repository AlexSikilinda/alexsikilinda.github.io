---
layout: post
title: "Non-Renewing iOS Subscriptions with Unity IAP"
date: 2018-08-09 00:00:00
tags: .NET Unity3D
comments: true
analytics: true
---

<img src='/public/images/NonRenSubsWithUnityIap/Piano3D-Subscription.png' alt="piano 3d subscription screen"/>

Today we are talking about iOS non-renewing subscriptions and Unity IAP. I implemented such feature in [Piano 3D](https://piano3d.com) and the process was not straightforward at all, so it is worth to document it here. Again, in this article we are talking exclusively about iOS, Play store subscriptions are different and this info is not relevant to Android development.

### What is subscription?

Subscription is a type of in-app purchase (IAP) that allows you to provide some services/content/features for a limited period of time. For example, full access to streaming service (Spotify, Netflix), ad-free access to piano tutorials (Piano 3D), access to a premium collection of photos or videos etc.
The key point here is that users can buy subscriptions multiple times, that makes them a bit similar to consumable IAP. There are two types of subscriptions in AppStore: auto-renewable and non-renewing.
<br>

### Auto-Renewable vs Non-Renewing

Auto-renewable subscriptions are renewed automatically, e.g. once per month (you can adjust the period), without users interaction, whereas with non-renewing subscription users have to manually resubscribe each month (again, you control the period, can be one week or one year). There are strict rules when to use each. Violating these rules will result in rejection during the app review.

### When to use Auto-Renewable subscriptions?

Auto-Renewable subscriptions can be used for periodic digital content. It can be magazines/music/cloud storage etc. Refer to official apple documentation.

### When to use Non-Renewing subscriptions?

This one is simple. If you cannot use Auto-Renewable, use Non-Renewing subscription. From the business perspective, Non-Renewing subscriptions are not as appealing as Auto-Renewable, but sometimes we don't have choice.

### Show me some code

Okay. Again, we are talking about Unity IAP, so make sure you have read and understood [Unity IAP integration guide](https://unity3d.com/ru/learn/tutorials/topics/ads-analytics/integrating-unity-iap-your-game). To work with iap you need a class that implements `IStoreListener`. This interface has `ProcessPurchase` method which is invoked after users approve the purchase. It's up to you what to do in `ProcessPurchase`, but we need to do smth so that we can check if the user has bought subscription later. We can, for example, save the subscription end date in [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html):

<script src="https://gist.github.com/AlexSikilinda/9705e7bee73ec83a87236045b55eec90.js"></script>

Now, to check if a user has an active subscription just invoke this method:

<script src="https://gist.github.com/AlexSikilinda/579fca9d72690932ea809487afce9959.js"></script>

Here we get the string containing our subscription end date from `PlayerPrefs`. Parse it and compare with `DateTime.UtcNow`.

Quite straightforward, isn't it? Well, not really.

### Restoring subscription

When a user reinstalls your app it's a good idea to allow him to access purchases he already bought. This process is called "restoring".
You can [restore Auto-Renewable subscriptions with Unity IAP](https://docs.unity3d.com/Manual/UnityIAPRestoringTransactions.html). Unfortunately, you cannot restore Non-Renewable subscription, since they are not stored in the app receipt. It means you will need to implement your own process of restoring non-renewing subscription.

One option is to use your own server with personal user accounts. In this case, you will ask the user to login in the app, check if this user has bought the subscription before on the server, and if yes, you unlock the subscription.

Another option is to use iCloud Key Value. You can think about it as `PlayerPrefs` which is stored in iCloud. So if a user reinstalls your app or change his device, our subscription end date will be stored in his iCloud Key Value, and we can validate his non-renewing subscription no matter what he does with our application. Keep in mind that users who are not signed in iCloud on their phones will not be able to restore their purchases this way. As I understand, Apple is okay with that.

Users cannot modify iCloud Key Value, so we are safe here.

### It's time for some open source code

Unity 3D doesn't have native code to work with iCloud Key Value, so we need a 3rd party plugin. Well, you can easily write it yourself if you know Objective C, but there is a library called [Unity.Library.eppz.Cloud](https://github.com/eppz/Unity.Library.eppz.Cloud) which does what we need. It is under the MIT license, so we can use it legally.

Now, instead of `PlayerPrefs`, we will use `Cloud` class from the library. To grant subscription:

<script src="https://gist.github.com/AlexSikilinda/d18741d2455dec982382d2f31b5a5205.js"></script>

Correspondingly, to check subscription:

<script src="https://gist.github.com/AlexSikilinda/8d66da8cf97b28ea4d562cb9780da024.js"></script>

Is that it? Well, not really.

### Final touches

To make this library work you will need to add `Cloud` MonoBehaviour to your scene. You will also need to enable corresponding features in your Xcode project:

<img src='/public/images/NonRenSubsWithUnityIap/xcode-icloud-settings.png' alt="xcode icloud settings for unity iap non renewing subscription"/>

### iCloud Key Value and Internet Access

You may ask: how do I check subscription status if a user doesn't have internet access? It's not a problem since iCloud stores local copies of all key-value pairs which means that our approach will also work without internet access.

### How to test it?

Changing iTunes and AppStore account may be enough to test purchases itself, but it is not enough to test the restoring process. You will need to completely sign out from your device (including turning Find My IPhone off etc.) and login with a different account to test iCloud Key Value. But it is definitely a good idea to test it with multiple test accounts since there are a lot of places where it can go wrong.

Let me know if this article helped you in the comments below.
