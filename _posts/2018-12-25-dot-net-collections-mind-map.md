---
layout: post
title:  ".NET Collections mind map"
date:   2018-12-25 00:00:01
tags: .Net Mindmaps
comments: true
analytics: true
---

<img src='/public/images/mindmaps/Collections.jpg' alt="dot net .net collection mind map mindmap"/>

[Open in full resolution.](/public/images/mindmaps/Collections.jpg)

Since I'm teaching .NET 101 course again, I decided that it would be
helpful to have some mind maps on the topics we cover. The first such
topic is .NET collections.

This post is not a complete manual, but rather a summary on the topic.
<br>

Collections in .NET consist of generic and non-generic collections. The latter exist because .NET 1 didn't have generics, so they work with `object`, thus introducing problems with boxing and type checking. Generic collections solve these problems, so we should always use them.

## Interfaces

The most important interfaces in collections (and probably in the whole .NET framework) are `IEnumerator<T>` and `IEnumerable<T>`. They give us the ability
to enumerate a collection. All other interfaces directly on indirectly extend these ones.

`ICollection<T>` adds methods `Add`, `Remove`, `Contains`, properties `Count` and `IsReadOnly` etc. on top of `IEnumerable<T>`.

`IList<T>` adds even more functionality on top of `ICollection<T>`, for example, an indexer.

`IDictionary<TKey, TValue>` is a base interface for dictionaries. Remember that it also extends `IEnumerable<KeyValuePair>`.

## Classes

`Array` is the base class for all arrays in .NET, and it is one of the most used collection. All arrays implement `ICollection<T>`, but hide `Add` and `Remove` methods by an explicit implementation.

`List<T>` is a data structure similar to array (it actually works on top of it), but it also allows adding and removing elements. The disadvantage of
`List<T>` is slow `Add` and `Remove` (only when the inside array needs to be resized).

`LinkedList<T>` is a peer to `List<T>`. Each element of this collection has
links to previous and next elements, thus adding and removing elements is very fast. The disadvantage of this is access to individual elements is `O(n)`.

`Queue<T>` is a data structure which corresponds to mnemonic rule "first-in-first-out".

`Stack<T>` is a data structure which corresponds to mnemonic rule "last-in-first-out".

`Hashset<T>` is a collection which doesn't allow duplicates (it silently ignores them) and has `O(1)`(constant) search time (`Contains` method).

`Dictionary<TKey, TValue>` is a most used dictionary although there are other classes which implement `IDictionary<TKey, TValue>`.