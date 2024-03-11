---
layout: post
title: "How to optimize Unity 3D build size"
date: 2024-03-11 00:00:01
comments: true
analytics: true
tags: Unity3D
---

<img src='/public/images/2024/unity3dBuildSize/initialBuildSizeReport.png' alt="unity 3d build report with size numbers"/>

At some point in your Unity 3D development cycle, you may find yourself in a situation where your build size feels much bigger than you would expect.

In this post we are taking a look at Unity 3D tools we can use to get some insights into what's consuming your precious build bytes.

A smaller size of a game or application is probably one of the most important non-functional requirements since it will make the app download (the first user experience) faster and more pleasant, thus improving the store conversion and saving users drive space.
<br>

## Determine which Assets take the most space

> Keeping the file size of the built app to a minimum is important, especially for mobile devices or for app stores that impose a size limit. The first step in reducing the size is to determine which Assets contribute most to it, because these Assets are the most likely candidates for optimization.
>
> <cite>[Reducing the file size of your build, Unity Docs](https://docs.unity3d.com/Manual/ReducingFilesize.html)</cite>

### Generating the Build Report

To get the size information you need to:

- build the app
- inspect the editor logs and find the Build Report section

You can build the app from the **File > Build Settings** menu (preferably selecting the platform you want to optimize for):

<img src='/public/images/2024/unity3dBuildSize/UnityBuildSettings.png' alt="unity 3d build settings menu"/>

After the successful build, you can open the Editor Logs from the Unity 3D console by clicking on the **Open Editor Log** option:

<img src='/public/images/2024/unity3dBuildSize/Unity3dEditorLog.png' alt="unity 3d editor log"/>

It opens the `Editor.log` text file in Notepad and we can either scroll down or search for the **Build Report** section:

<img src='/public/images/2024/unity3dBuildSize/initialBuildSizeReport.png' alt="unity 3d build report with size numbers"/>

### Inspecting the Build Report

Each app is different so this step will be specific to your project, but we still can give general guidance based on the inspection I did for [Piano 3D](https://piano3d.com).

```
Textures               56.4 mb	 62.1%
Meshes                 132.0 kb	 0.1%
Animations             11.0 kb	 0.0%
Sounds                 14.2 mb	 15.7%
Shaders                2.3 mb	 2.5%
Other Assets           17.4 mb	 19.1%
Levels                 0.0 kb	 0.0%
Scripts                211.9 kb	 0.2%
Included DLLs          0.0 kb	 0.0%
File headers           113.1 kb	 0.1%
Total User Assets      90.7 mb	 100.0%
```

As you can see, 56.4 mb or 62.1% is taken by Textures, and if we scroll lower we can the individual files:

```
Used Assets and files from the Resources folder, sorted by uncompressed size:
 7.9 mb	 0.7% Packages/com.unity.render-pipelines.high-definition/Runtime/Lighting/LightLoop/Deferred.compute
 5.3 mb	 0.5% Packages/com.unity.render-pipelines.high-definition/Runtime/RenderPipelineResources/Texture/Water/FoamMask.png
 2.7 mb	 0.2% Built-in Texture2D: Splash Screen Unity Logo
 2.7 mb	 0.2% Assets/TextMesh Pro/Resources/Fonts & Materials/gold-scuffed_basecolor-boosted.png
 2.7 mb	 0.2% Assets/TextMesh Pro/Resources/Fonts & Materials/gold-scuffed_basecolor.png
 2.7 mb	 0.2% Assets/TextMesh Pro/Resources/Fonts & Materials/gold-scuffed_normal.png
 2.3 mb	 0.2% Packages/com.unity.render-pipelines.high-definition/Runtime/RenderPipelineResources/Texture/VolumetricClouds/WorleyNoise128RGBA.png
 2.0 mb	 0.2% Assets/Materials/reflectionSkybox.hdr
 2.0 mb	 0.2% Packages/com.unity.render-pipelines.high-definition/Runtime/RenderPipelineResources/Texture/DefaultCloudMap.png
 2.0 mb	 0.2% Packages/com.unity.render-pipelines.high-definition/Runtime/RenderPipelineResources/Texture/HairLongitudinalScatteringLUT.asset
 2.0 mb	 0.2% Packages/com.unity.render-pipelines.high-definition/Runtime/RenderPipelineResources/Texture/HairAzimuthalScatteringLUT.asset
 2.0 mb	 0.2% Packages/com.unity.render-pipelines.high-definition/Runtime/Lighting/VolumetricLighting/VolumetricLighting.compute
 1.0 mb	 0.1% Assets/TextMesh Pro/Resources/Fonts & Materials/LiberationSans SDF.asset
 1.0 mb	 0.1% Packages/com.unity.render-pipelines.high-definition/Runtime/RenderPipelineResources/Texture/HairAttenuationLUT.asset
 940.3 kb	 0.1% Assets/UI/Notes/GKey.png
 939.6 kb	 0.1% Assets/UI/Notes/WhiteGKey.png
 939.1 kb	 0.1% Assets/UI/Notes/WhiteFKey.png
 939.0 kb	 0.1% Assets/UI/Notes/FKey.png
 938.8 kb	 0.1% Assets/UI/Notes/LaHigh.png
 938.8 kb	 0.1% Assets/UI/Notes/Do.png
 938.7 kb	 0.1% Assets/UI/Notes/SiLow.png
 938.7 kb	 0.1% Assets/UI/Notes/SiHigh.png
 938.6 kb	 0.1% Assets/UI/Notes/Re.png
 938.6 kb	 0.1% Assets/UI/Notes/ReHigh.png
 938.6 kb	 0.1% Assets/UI/Notes/Si.png
 938.6 kb	 0.1% Assets/UI/Notes/Sol.png
 938.6 kb	 0.1% Assets/UI/Notes/FaHigh.png
 938.6 kb	 0.1% Assets/UI/Notes/SolHigh.png
 938.6 kb	 0.1% Assets/UI/Notes/Mi.png
 938.3 kb	 0.1% Assets/UI/Notes/MiHigh.png
 938.3 kb	 0.1% Assets/UI/Notes/Fa.png
 938.3 kb	 0.1% Assets/UI/Notes/DoHigh.png
 938.3 kb	 0.1% Assets/UI/Notes/La.png
```

So we can see that there are some big textures from **TextMesh Pro**, that aren't even used in the project. I think I added it at some point and forgot to remove them completely. And even though Unity will probably strip it from the final build because it removes unused assets, it still makes sense to get rid of them and clean the solution.

The next "family" of assets taking a lot of space is the images with notes:

<img src='/public/images/2024/unity3dBuildSize/Piano3dNotes.png' alt="piano 3d project with notation enabled"/>

The textures are used to render notation on the keys, and the problem is each texture takes one megabyte, which seems a bit excessive. We can disable mipmaps generations and enable some compression getting the size down to kilobytes.

Just by doing these simple optimizations I was able to get from the initial **90.7mb** to **61.4mb** and I only fixed notation textures, I can probably get it to less than 50mb in future:

```
Uncompressed usage by category (Percentages based on user generated assets only):
Textures               27.6 mb	 45.0%
Meshes                 132.0 kb	 0.2%
Animations             11.0 kb	 0.0%
Sounds                 14.2 mb	 23.2%
Shaders                2.1 mb	 3.4%
Other Assets           17.0 mb	 27.6%
Levels                 0.0 kb	 0.0%
Scripts                211.9 kb	 0.3%
Included DLLs          0.0 kb	 0.0%
File headers           112.2 kb	 0.2%
Total User Assets      61.4 mb	 100.0%
```

## Summary

- Unity 3D Build Size Report can be used to investigate what takes the most space in your application.
- To open the report you need to build the app and open the editor log from the "Console" submenu.
- Build size optimization is project-specific, but it usually involves identifying the textures, meshes, and animations taking the most space and optimizing them.
- Build size is especially important for mobile devices and app stores in general.
- Another option to optimize the size of the app is using [AssetBundles](https://docs.unity3d.com/Manual/AssetBundlesIntro.html) (not covered in the article).
