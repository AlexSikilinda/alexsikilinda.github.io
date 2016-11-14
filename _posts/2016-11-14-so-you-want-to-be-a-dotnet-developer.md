---
layout: post
title:  "So you want to be a .NET web developer?"
date:   2016-11-14 12:22:00
tags: .Net
comments: true
analytics: true
---

<img src='/public/images/dotNetDeveloper.png' alt="web .net developer"/>

I decided to write a post about skills IMHO a person should have to get a job as a .NET web developer.
Well, the mindmap above contains everything I wanted to say, so let's just review it. I also will try to 
give some recommendations about resources and books you can use to improve your knowledge in particular area.

## .NET

It's obvious that each .NET develop should know .NET fundamentals (CLR, CTS, JIT). I don't say you have to know 
internals of JIT compiler, but it's essential to have high-level understanding of this concepts.
<br>
Although .NET framework supports various programming languages, C# is de facto the standard, so I highly recommend to
start with C# and once master it, you can investigate another language like F#, Visual Basic etc.

Knowing syntax and semantic of C# is not enough to write good code. You also need to know BCL which stands for Base
Class Library. It is essentially a set of .NET types you will use on an everyday basis.

Of course, you need a framework to write Web applications. ASP.NET MVC is the option here. It is currently the most
popular framework to write Web applications using .NET.

## Databases

Databases help to store your data, and relational database knowledge is important for any developer.
Although .NET can work with almost any database, you will probably work with Microsoft SQL Server and thus T-SQL,
which is Microsoft implementation of SQL standard.

To execute SQL from C# program you can use a technology called ADO.NET, which was developed to connect .NET and databases.

There are also some libraries which allow you to query and modify database without SQL at all. These are often called
ORM which is an acronym for Object Relationship Mapping. The one which is widely used in .NET is called EntityFramework.

## Computer Science

There is a science behind the code, so it makes sense to know at least some introductory concepts. You may not write
sort algorithms (I did it only in my university) and your own data structures, but they are used all the way through the framework.
Which list implementation do you know? What's the complexity of quick sort? What is a balanced tree? You should be familiar with this concepts.

You will deal with files, processes and threads. These are concepts of operating systems, so add these concepts to your knowledge.

Your application are gonna use networks, so you better know what OSI model is, protocol levels and so on.

## Web 
There are so many concepts and frameworks connected to WEB development, so it would be hard to enumerate all of them.
Still, there are some core concepts:

* HTML, CSS
* Protocols (HTTP, DNS, TCP/IP)
* Javascript, jQuery, AngularJS
* Data formats (JSON, XML)

## Tools

You will use these tools each day, so it makes sense to be familiar with them: Visual Studio, SQL Server Managment Studio (aka SSMS), Git.
Once learned you won't be able to live without git, because it simplifies your life, and allows you to move back and forth in the history of your project.
Extremely convenient.

## Other

English is extremely important. If you are not a native speaker English is the first thing you should learn. New books, blogs, videos, conferences, documentation are all in English, 
so don't limit yourself.

You will be working with other people in a team, so good communications skills are highly desired. Google what soft skills are. 



