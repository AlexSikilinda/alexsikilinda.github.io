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

Check [recommended reading](/recommendedreading) for books about .NET in general.
For ASP.NET I recommend `Pro ASP.NET MVC 5` by Adam Freeman.

<img src='/public/images/dotNetDeveloper/proAspNet.jpg' alt="pro asp.net"/>

## Databases

Databases help to store your data, and relational database knowledge is important for any developer.
Although .NET can work with almost any database, you will probably work with Microsoft SQL Server and thus T-SQL,
which is Microsoft implementation of SQL standard.

To execute SQL from C# program you can use a technology called ADO.NET, which was developed to connect .NET and databases.

There are also some libraries which allow you to query and modify database without SQL at all. These are often called
ORM which is an acronym for Object Relationship Mapping. The one which is widely used in .NET is called EntityFramework.

The classical book is `An introduction to Database System` by Date:

<img src='/public/images/dotNetDeveloper/dateBook.jpg' alt="database system"/>

Although Date's book is great, it may be an overkill for learning SQL, especially for a novice. It has a lot of theory (it's a CS book!) which
you probably will not need. I still encourage you to check this book though, reading such books is what distinguish a good developer from an average one.

I would start with another book, which is more focused on SQL and basic concepts - Martin Gruber's `Understanding SQL`:

<img src='/public/images/dotNetDeveloper/gruberBook.gif' alt="understanding sql martin gruber"/>

It's quite old (1990, I hadn't born yet), but it rocks!

We also need something about ADO.NET and EntityFramework. I haven't read any specific book about data access,
but there are corresponding chapters in Andrew Troelsen's `Pro C# 5.0 and the .NET 4.5 Framework`:

<img src='/public/images/dotNetDeveloper/troelsenBook.jpg' alt="troelsen book pro c sharp and dot net"/>

I also recommend a site called [pluralsight.com](https://pluralsight.com) which has a lot of video lectures about various topics including databases and data access.
You can get a free 3-month subscription when you register for Microsoft Dev Essential program.

## Computer Science

There is a science behind the code, so it makes sense to know at least some introductory concepts. You may not write
sort algorithms (I did it only in my university) and your own data structures, but they are used all the way through the framework.
Which list implementation do you know? What's the complexity of quick sort? What is a balanced tree? You should be familiar with this concepts.

Everyone recommends `Introduction to Algorithms` by Thomas H. Cormen and others, so do I:

<img src='/public/images/dotNetDeveloper/cormenBook.jpeg' alt="cormen book introduction to algorithms"/>

It's a big book, but you don't have to read everything. Start with basics (implement it in C#!) and then try to understand more advanced stuff.

You will deal with files, processes and threads. These are concepts of operating systems, so add these concepts to your knowledge.
Here we will read the book Linus Torvalds had read before starting writing Linux - `Modern Operating Systems` by Andrew Tanenbaum:

<img src='/public/images/dotNetDeveloper/tanenbaumOsBook.jpg' alt="tanenbaum modern operating systems"/>

Your applications are gonna use networks, so you better know what OSI model is, protocol levels and so on. Again Tanenbaum, `Computer Networks`:

<img src='/public/images/dotNetDeveloper/tanenbaumNetworkBook.jpg' alt="tanenbaum computer networks"/>

Again, these are big books, but it is the basics, so you should at least start reading these books and try to not stop.

## Web 
There are so many concepts and frameworks connected to WEB development, so it would be hard to enumerate all of them.
Still, there are some core concepts:

* HTML, CSS
* Protocols (HTTP, DNS, TCP/IP)
* Javascript, jQuery, AngularJS
* Data formats (JSON, XML)

There are so many books and materials about these topics so it's kind of meaningless to give any advice.
Just google the topic you are interested in and stick to the learning path.

I would recommend: [HTML5 & CSS3 Fundamentals: Development for Absolute Beginners](https://mva.microsoft.com/en-US/training-courses/html5-css3-fundamentals-development-for-absolute-beginners-14207?l=Y4COscFfB_7500115888),
[JavaScript Fundamentals for Absolute Beginners](https://mva.microsoft.com/en-US/training-courses/javascript-fundamentals-for-absolute-beginners-14194?l=DmF3TY1eB_9500115888),
[HTTP fundamentals](https://www.pluralsight.com/courses/xhttp-fund).

One of the best books about javascript is `JavaScript: The Good Parts` by Douglas Crockford. It can be hard for understanding if you don't have experience in programming, otherwise it's great.

<img src='/public/images/dotNetDeveloper/crockfordBook.png' alt="douglas crockford javascript the good parts"/>

For jQuery - `jQuery in Action` by Bibeaula, Katz:

<img src='/public/images/dotNetDeveloper/jqueryBook.jpg' alt="jQuery in action"/>

## Tools

You will use these tools each day, so it makes sense to be familiar with them: Visual Studio, SQL Server Managment Studio (aka SSMS), Git.
Once learned you won't be able to live without git, because it simplifies your life, and allows you to move back and forth in the history of your project.
Extremely convenient.

I recommend `ProGit` which you can [download for free from the official git website](https://git-scm.com/book/ru/v2):

<img src='/public/images/dotNetDeveloper/proGit.png' alt="pro git book"/>


## Other

English is extremely important. If you are not a native speaker English is the first thing you should learn. New books, blogs, videos, conferences, documentation are all in English, 
so don't limit yourself.

You will be working with other people in a team, so good communications skills are highly desired. Google what soft skills are. 



