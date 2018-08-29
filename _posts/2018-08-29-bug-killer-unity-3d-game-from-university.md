---
layout: post
title:  "The story of Bug Killer"
date:   2018-08-29 00:00:00
tags: Unity3D
comments: true
analytics: true
---

<img src='/public/images/BugKiller/bug-killer-main-image.jpg' alt="bug killer main level"/>
Recently I remembered that there was a game we made with my groupmates on the 3rd year of university (5 years ago!), and, guess what, it is still in my private git repo so I cloned and built it (surprisingly successfully). Then I decided to write a post about the game because it's not really fun to play, but, it's fun to review the screenshots and remember how it was created.
<br>

## Background and the idea

So, we were studying software methodologies (agile in particular), and we were assigned a mentor from a local software company called Sigma. We had to work in a team of 4-5 people + mentor and one of the tasks was to develop a game. We didn't have any experience in gamedev, and the only thing we knew good enough was C# so we took Unity 3D engine.

We had to come up with the idea for the game and we end up with a platformer in which you have to kill program bugs (represented by real bugs) in the Sigma Software office (the mentor's company). There was a competition between all the projects and we thought it could give us some extra points.

The game was named "Bug Killer".

## The main menu

The first thing a user sees is the main menu, so a girl from our team painted a background image with two characters shooting in a bug in the office. 

<img src='/public/images/BugKiller/bug-killer-main-menu.jpg' alt="bug killer main menu"/>

We didn't have much time and Unity only had the old "OnGUI" option to create UI so it's quite simple, only two buttons, "New Game" and "Quit Game".
If a user still wants to play and selects "New Game" option we ask him to select the character:

<img src='/public/images/BugKiller/bug-killer-character-selection.jpg' alt="bug killer character selection"/>

Can't you see this beautiful red office door? I created it by myself in Blender and I'm still kinda proud of it.

## The gameplay

Once a user has selected his alter ego he shows up in the office. On the first floor there are two "levels" doors, and if you use an elevator and get to the second floor there are a few photographs of famous "bug killers" (like Linus Torvalds, Andrew Tanenbaum etc.). If you press "E" standing in front of a "level" door you are transferred to the corresponding level.

It is not mandatory to complete the first level, but if you do this you will get a weapon upgrade.

This is how the second level looks:
<img src='/public/images/BugKiller/bug-killer-second-level.jpg' alt="bug killer second level"/>

Bugs folow you once they can see you and they bite you if they manage to reach you. If you lose all your health point and you get your blue screen of death:

<img src='/public/images/BugKiller/bug-killer-death-screen.jpg' alt="bug killer blue death screen"/>

But if you manage to survive and kill the main boss (appears on the second floor with all that images) you get the credits scene:

<img src='/public/images/BugKiller/bug-killer-you-win-screen.jpg' alt="bug killer win screen"/>

Not sure this post is really useful for public, but it's certainly fun for me to remember the development process and I am even going to discuss some serious technical things from this game in the next post, so stay tuned :)