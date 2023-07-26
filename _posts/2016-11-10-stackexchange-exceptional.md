---
layout: post
title: "StackExchange.Exceptional: ELMAH on steroids"
date: 2016-11-10 10:40:00
categories: libraries
tags: .NET StackExchange
comments: true
analytics: true
---

<img src='/public/images/exceptional.png' alt="stackexchange exceptional"/>

Logging is a really important system if you care about your users. Not only should it give you errors details, but also notify you that something is wrong before users start complaining
or submitting bug reports.

There are probably dozens of logging solution, and I'm sure there are hundreds thousands of self-written loggers on various projects. But I wouldn't recommend writing your own logging since
you probably won't be able to do it right the first time (and the second, and the third etc). It's better to use existing solution, like [ELMAH](https://elmah.github.io/) ([Scot Hanselman's blog post about it](http://www.hanselman.com/blog/ELMAHErrorLoggingModulesAndHandlersForASPNETAndMVCToo.aspx))
or [StackExchange.Exceptional](https://github.com/NickCraver/StackExchange.Exceptional).
<br>

## What is ELMAH?

ELMAH is an acronym: Error Logging Modules and Handlers. So it is an [ASP.NET HTTP module](https://msdn.microsoft.com/en-us/library/bb398986.aspx) that handles all unhandled exceptions and stores
them for you. It also gives you ability to review what happened in your application from the application itself.

As you can see, ELMAH subscribes to `HttpApplication.Error` event, and gets the last error in the `OnError` method :

<script src="https://gist.github.com/AlexSikilinda/fc7c553e24e7fc737de497e3c4f166b3.js"></script>

The cool thing about ELMAH is that you actually don't need to write any code to use it. In fact, you can add it to already deployed and working application.
Just add `ErrorLogModule` to your `web.config`, and it will just work (you also need to configure ELMAH in corresponding config section).
You can also manually log exceptions using `ErrorSignal` class.

We got the main idea about logging exceptions, now let's find out how to investigate logged exception.
Just navigate to `http://yoursite/elmah.axd`, and if you have `ErrorLogPageFactory` handler added to your `web.config` you will see the following:

<img src='/public/images/elmah.png' alt="elmah view exceptions"/>

You can click on individual exception to get more details:

<img src='/public/images/elmahDetails.png' alt="elmah exception detail"/>

Pretty handy, isn't it? It is, especially if you also want to send emails on each exception, filter unwanted exceptions etc. Yes, ELMAH supports this.

## StackExchange strikes back

StackExchange team [used to use ELMAH](https://blog.codinghorror.com/exception-driven-development/) (a custom port). At some point they decided to write their own
ELMAH with [some improvements](https://nickcraver.com/blog/2012/08/23/keeping-track-of-the-bad-things/).

<img src='/public/images/elmahBlender.jpg' alt="StackExchange blender"/>

So StackExchange.Exceptional was born. It essentially works the same way as ELMAH (also has ASP.NET Module which is added to your application).
Let's just add the top image again here, this is how StackExchange.Exceptional looks like:

<img src='/public/images/exceptional.png' alt="stackexchange exceptional"/>

But it also has
some improvements, which I find very useful.

### Exceptions duplicates count

StackExchange.Exceptional doesn't log exceptions as a new log entry if a similar exception occurred some time ago. Instead, it just increments duplicates count
on original exception. How does it know two exceptions are the same? By comparing exceptions types and stacktraces. This will allow you to find most common exception faster.

### Application Name

You can set `applicationName` attribute in `<Exceptional>` section in `web.config`. This value is written to the DB and allows you to use the same table for different applications.
For example, you can store exceptions from user site, admin site, workers, services, api projects in the same place and easily filter them when you need it.

<img src='/public/images/excAppName.png' alt="stackexchange exceptional"/>

### Opserver

There is another tool from StackExchange which seamlessly integrates with StackExchange.Exceptional. It is an [open source ASP.NET MVC application called "Opserver"](https://github.com/opserver/Opserver).
Opserver is web UI for monitoring things StackExchange uses like MS SQL, Redis, ElasticSearch etc. A natural use case for Opserver is viewing exceptions from StackExchange.Exceptional, and it supports it.
Moreover, it supports search and filtering, which makes it extremely useful.

So let's setup Opserver so that we can easily investigate issues with such applications:

- User site
- Admin site
- External API project
- Worker

Each application has corresponding `applicationName` attribute, so, for example, User site will have `<Exceptional applicationName='User site'>` and so on. Each application uses the same db for exception
logging.

To configure Opserver we need to:

1. Clone Opserver from [https://github.com/opserver/Opserver.git](https://github.com/opserver/Opserver.git)
2. Edit `SecuritySettings.config` appropriately. For our demo purposes let's set `<SecuritySettings provider="alladmin" />`:
<script src="https://gist.github.com/AlexSikilinda/95aec5fa62f46af671ad93605c5cf582.js"></script>
3. Edit `ExceptionsSettings.settings`:
<script src="https://gist.github.com/AlexSikilinda/7d6726113570f52311231bd25ad80881.js"></script>
4. Launch Opserver, use a random pair of login\pass when asked (remember we set `alladmin`?), and you should get this:
   <img src='/public/images/opserver.png' alt="stackexchange exceptional"/>

You can filter exceptions by clicking on app name and search exceptions.

## Summary

At this point, I don't see any reasons why you should use ELMAH instead of StackExchange.Exceptional. Essentially it is ELMAH + additional features + you have opserver.
Anyway, you choose.
