---
layout: post
title:  "Developing Universal Windows Apps on Mac OS"
date:   2018-02-08 12:22:00
tags: .Net UWP MacOS
comments: true
analytics: true
---

<img src='/public/images/UwpOnMacOs/VirtualBoxWithWindowsImage.jpg' alt="visual studio on mac os"/>

I woke up today and realized that I want to update my old app "Irregural Verbs Trainer" to Windows 10. This is a bit strange because I am currently working on Piano 3D. There is no way I will release Piano 3D in the following month though, and I want to [ship smth](https://blog.codinghorror.com/yes-but-what-have-you-done/). Smth = Irregural Verbs Trainer in this case.

Irregural Verbs Trainer is a great app, but users do not use it. I have got only about 400 downloads of this app which is basically nothing. The reason: I made the app not free, although there is an unlimited trial version. So, 95% of the app is bascially free, but in the store it is listed in the "Paid apps" category. It is silly if you think about it. Never ever make a small app not free from the beginning. You don't have marketing budget and users hardly ever buy an unknown app, especially such a small one. Much better option is a free app with IAP (in-app purchase), at least it will not scary users away.

So I decided to switch from Piano 3D development and other thoughts in my head and ship a new version of Irregural Verbs Trainer in short period of time (no more than 2 days).

There is one small problem though: *I do not have Windows PC, only MacBook with MacOS*.
<br>

Well, I lied. I do have Windows laptop, but it is sooooo slow I can literally run to a store and buy a new Windows laptop while it is building my not-even-close-to-big application. Frankly speaking I started to think about new Dell XPS 13, but I'm in a kind of limited financial situation, and spending 1.5k$ on new laptop just to get Windows machine doesn't sound appealing, especially owning a top noth MacBook. But no, I do not want to install Windows in dual boot. This leaves us with virtual machine option. But I am lazy, and installing Windows even on a virtual machine is too hard.

I almost gave up on my idea of shiping a new update in two days. But then I remembered that Microsoft has ready to use Windows images for testing various versions of Internet Explorer and Edge. Wouldn't it be sensible for them to have an image for Universal Windows App development? It would! [Windows 10 images](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) with SDK and Visual Studio already setup. Downloading them and setting VirtualBox up was a straighforward process, and in less than an hour I got fully working UWP development environment.

It is cool, isn't it?
