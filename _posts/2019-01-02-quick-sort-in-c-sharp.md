---
layout: post
title: "6 lines long quicksort in C#"
date: 2019-01-02 00:00:01
tags: .NET Functional C# LINQ
comments: true
analytics: true
---

<script src="https://gist.github.com/AlexSikilinda/15732c0973198e911c1fe23183cee448.js"></script>

That's it. Well, this is not very efficient, and shouldn't be used in real-world scenarios,
but it shows how powerful LINQ can be.

We compare this code with imperative version and even with Haskell below.
<br>

So, let's compare it with imperative code I wrote in 2011 being a first-year student (again, shouldn't be used in the real world):

<script src="https://gist.github.com/AlexSikilinda/fc4d7f1b511a52e18bf47a8acdbc82e4.js"></script>

As you can see, functional version is in fact much easier to understand, and much shorter, of course.

The implementation is actually adopted version of Haskell script from Erik Meijer's MOOC "Functional Programming 101",
so let's compare with Haskell version:

<script src="https://gist.github.com/AlexSikilinda/4f56c7507cf0e4461633334f9dcdecfa.js"></script>
