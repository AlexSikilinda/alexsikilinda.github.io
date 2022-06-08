---
layout: post
title: "LINQ mind maps"
date: 2018-12-27 00:00:01
tags: .Net Mindmaps LINQ
comments: true
analytics: true
---

<img src='/public/images/mindmaps/LINQ.jpg' alt="dot net .net linq mind map mindmap"/>

[Open in full resolution.](/public/images/mindmaps/LINQ.jpg)

More mind maps which can be useful for .NET learners.

LINQ is an important topic, and understanding its concepts is crucial.

<img src='/public/images/mindmaps/linqMethods.jpg' alt="dot net .net linq methods mind map mindmap"/>

[Open in full resolution.](/public/images/mindmaps/linqMethods.jpg)

LINQ is built around `IEnumerable<T>` and `IEnumerator<T>` interfaces.
It is implemented as extension generic methods which allows us to use it
with all collection classes.
<br>

Due to the nature of `IEnumerator<T>`, LINQ methods returning `IEnumerable<T>` have a concept of **lazy (also called deferred) execution**.

All generic methods in C#, including LINQ, can **implicitly infer type arguments**,
thus we do not need to specify them in most cases.

Another important topic in LINQ world is **delegates**. Delegates are types representing references to methods. Majority of LINQ methods accept `Func<...>` delegates.
Most common option to provide a delegate is to write a **lambda expression** (or statement).
It's important to understand that lambda expressions can capture outer variables (a.k.a. closures).

We also should be aware that if you work with `IQueryable<T>` interface, the **query is compiled** (for example in SQL) and executed remotely.

There are methods for filtering, projecting, joining, ordering, grouping, conversion, set operators, element operators, aggregation, quantifiers, and generation.
