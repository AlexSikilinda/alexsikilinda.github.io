---
layout: post
title:  "Piano 3D released worldwide on iOS and Android"
date:   2018-07-30 00:00:00
tags: .Net Unity3D Piano3D
comments: true
analytics: true
---

<img src='/public/images/Piano3DMainScreen.png' alt="piano 3d"/>

I have finally released Piano 3D worldwide on both iOS and Android.
Download iOS version [here](https://itunes.apple.com/app/id1402994766), and Android version [here](https://play.google.com/store/apps/details?id=com.MobilrKingdom.Piano3D).

This post will be the first one in the series about Piano 3D, it's development and design processes, marketing and distribution.
Today we are talking about the history.

## Piano 3D Timeline

* April 2014 - first commit in git
* April 2014 - first release in Windows Store
* May 2014 - scrolling and scaling added
* May 2014 - started working on tutorials
* June 2014 - new interface using new Unity UI
* August 2014 - synth added
* June 2015 - fifth release for Windows Store
* September 2016 - started working on new UI for iOS and Android
* July 2018 - worldwide release for iOS and Android

## The History

It's all started in 2014. It was my third year at Software Engineering department as an undergraduate student and writing my own application sounded like a good idea to improve my skills and get some real-world experience. I only had a quite old Windows-based pc so developing for Windows was my only choice at that time. Fortunately, Microsoft had just released Windows 8 with the new app store and, correspondingly, the new app type they called "Metro" applications. I mostly program in C#, so it wasn't quite hard for me to start developing my applications, moreover, a local company called DCT with Microsoft support hold a competition of best Windows 8 apps, which was also a motivation.
<br>

The first app I released was [Irregural Verbs Trainer](https://www.microsoft.com/en-us/p/irregular-verbs-trainer/9wzdncrdcwvq?activetab=pivot%3aoverviewtab). It had a nice and clean MVVM architecture, but I made a mistake of making it not free, so I've got only about 500 downloads (most of them being trial periods).

### The first version (2014)

The next app was Piano 3D. Initially, there were only two requirements: it should be in 3D to be as close to real instruments as possible and the UI should be minimalistic so that it doesn't distract users from playing. I still wanted to program in C#, so Unity3D was a natural choice here. I also used Blender to create 3D models of piano keys.

Here is the first version of the app:

<img src='/public/images/piano-3d-windows-8-mainscreen.jpg' alt="windows 8 piano 3d">

The only two functions were scrolling and changing sounds. The UI was build using "Metro" XAML which communicated with Unity by means of delegates invocation. 

People started downloading the app, like, a lot. At some point it had more than 1000 daily downloads which was a surprise for me.
Moreover, there was an IAP which unlocked Guitar sound and users started to buy it, which was an even bigger surprise for me.

### The second version (2014-2015)

Since the app surprisingly become popular I decided to keep improving it. At that time I needed to select the topic of my bachelor project, and I decided to write a sound synthesizer, which also could be incorporated to Piano 3D. I didn't quite like to interact with XAML from Unity 3D, so I also decided to rewrite the interface with the new Unity UI.

The second version of Piano 3D looked smth like this:

<img src='/public/images/piano3d-second-version.png' alt="windows 8 piano 3d with new UI and synth">

### Some experiments with no results

There is a couple of features I implemented at that time which didn't end up in the second release, but still worth mentioning. The first one was MIDI support. Fun fact: Windows 8 didn't support midi for x32 applications and unity didn't support building for x64 architecture, so I spent a couple of days trying to find this issue. Fortunately, Windows 10 supports both x32 and x64 for MIDI IO. 

The second one was even more interesting: AR. A friend of mine has got a device called LEAP motion which allowed to track hands position. They had Unity SDK, so enabling it wasn't a big problem.

<img src='/public/images/piano-3d-with-leapmotion.jpg' alt="piano 3d with leapmotion">

Although it was fun, leap motion didn't have enough accuracy to be useful in the app.

### Starting work on iOS and Android versions (2016)

In September of 2016 I decided that I really want to focus on releasing Piano 3D for iOS and Android. And I wanted it to look much better than it was at that time so I asked a friend of mine who happened to be a graphic designer to help me with the UI. We finished the concept in October and I planned to release the app in November, but I kind of put it on hold because I had my daily job, I was still studying in my university and I didn't have the motivation to work on the app, although it was always in my TODO lists.

### The release (2018)

In January 2018 I left my job. Writing the app was one of the reasons, but certainly not the main one. Nevertheless, I've got a lot of free time which I mostly wasted but sometimes I spent it working on Piano 3D, and in July of 2018 I released the application both for iOS and Android. Although I like the final result, it's still unknown if other people will use it. But it will be the subject of the next posts, so stay tuned.

Here it the released version:

<img src='/public/images/Piano3D-ios-and-android-ui.png' alt="piano 3d ios android">

### Download and subscribe

Download [iOS version](https://itunes.apple.com/app/id1402994766) and [Android version](https://play.google.com/store/apps/details?id=com.MobilrKingdom.Piano3D). Subscribe and like on [Instagram](http://instagram.com/piano3dapp), [YouTube](https://www.youtube.com/channel/UC9MOkgEEoZUGpnM8B3MsYeA), [Facebook](https://www.facebook.com/piano3d) and [Twitter](https://twitter.com/piano3d).


