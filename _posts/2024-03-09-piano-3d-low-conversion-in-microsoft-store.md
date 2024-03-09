---
layout: post
title: "Piano 3D low conversion in Microsoft Store"
date: 2024-03-09 00:00:01
comments: true
analytics: true
tags: UWP Piano3D
---

<img src='/public/images/2024/piano3dLowConversion/piano3dAcquisition.png' alt="a aquisition funnel graph of Piano 3D app on Windows"/>

For some reason, my app, [Piano 3D](https://piano3d.com), is not downloaded much even though there are a lot of people visiting [the Store Page](https://apps.microsoft.com/detail/9wzdncrdcwvn?hl=en-us). It's a bit disappointing, as is the fact that the app gets 23rd place for "piano" search term in the Windows Store. Probably this is related to low conversion too.

So the question is, of course, how to improve the conversion. I'm not an expert, but I'll try the following:

- new look and feel achieved by implementing HDRP rendering pipeline in Unity 3D
- decreasing the app size (currently ~123MB)
- new logo

This post will be the baseline for future updates, so just want to track conversion change.
If you have any advice on what may be wrong, the comments are opened and you are more than welcome.

I'll attach more statistics just for historical reasons.
<br>

### Installs

<img src='/public/images/2024/piano3dLowConversion/piano3dInstalls.png' alt="a graph of Piano 3D isntalls"/>

### Incomplete Installs

I have a feeling the download doesn't quite work for some users, so they either stop it or are just unable to finish installing. In fact, I was contacted by a user saying he's not able to install the app from the Windows Store, even though he tried to do it repeatedly with the same result - the download gets stuck. I hope decreasing the size of the app will help with it, but it really seems like a Microsoft issue I have little control of.

<img src='/public/images/2024/piano3dLowConversion/piano3dIncompleteInstalls.png' alt="a graph of Piano 3D incomplete installs"/>

### Usage

We can see that there are more existing users using the app than new ones. I find it a little bit strange, but probably explainable by the low conversion rating.

<img src='/public/images/2024/piano3dLowConversion/piano3dUsage.png' alt="a graph of Piano 3D usage"/>

I'm going to release a new updated version with significant improvements which hopefully will improve the conversion and post my updates and findings in future posts.
