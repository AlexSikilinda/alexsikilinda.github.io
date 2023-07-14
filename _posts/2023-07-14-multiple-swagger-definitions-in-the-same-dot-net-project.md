---
layout: post
title: "Multiple Swagger definitions in the same .NET project"
date: 2023-07-14 00:00:01
tags: .Net C#
comments: true
analytics: true
---

<img src='/public/images/MultipleSwaggerFiles.png' alt="Multiple service references added to the same project"/>

A Swagger file is a json file containing API definition which allows you to consume an API without manually writing your own request/response classes or HttpClient code. Instead, you are getting an automatically generated typed client and corresponding classes.

Since Swagger file is an implementation of the OpenAPI standard, people can refer to it as OpenAPI file, definition or specification.
<br>

You can add a Swagger file (or a URL to a Swagger definition) by right clicking on a project file and selecting **Add -> Service Reference...**.

After selecting "OpenAPI" and providing the details (including selecting the file or URL), OpenAPI tool will generate you a C# client you can use to interact with the API.

## More than one service

Sometimes we need to consume more than one service in the same project. This can be achieved by adding multiple Swagger definitions, however once you add them and try to build the project you will get this exception:

{% highlight console %}
Error CS0246 The type or namespace name 'ApiException' could not be found (are you missing a using directive or an assembly reference?)
{% endhighlight %}

To fix the problem we need to understand how the generated client handles non-200 responses.

## What is an ApiException?

Since we are not working with HTTP classes directly, we do not have access to `HttpResponse`, `HttpClient` or any other http related objects. But the generated client still needs a way to notify us the HTTP call was not successful (400 or 500). It does it by throwing a special exception type `ApiException` which it also generates with other API specific classes. It contains the HTTP data we need to debug and/or handle a failed request.

But now we have a problem: `ApiException` class is generated for the first Swagger client, but the tool cannot generate the same class for the second client since they will conflict. This is why `ApiException` is generated only for one client and we get this error.

## The fix

There are a couple ways we can fix the error. The first one is to create separate projects for each client. Even though it's probably quite straightforward, I personally do not like monstrous solutions with dozens of projects, especially if the app itself is not big. So let's see how to make it work in the same project.

To fix the problem we can create the `ApiException` manually and tell OpenAPI tool to not try to generate it. This way the generated clients will utilize the same `ApiException` class and there won't be any conflicts.

Create a new file in the project's root caleed `ApiException.cs` with the following content (usings and namespace omitted):

<script src="https://gist.github.com/AlexSikilinda/5f9bddda27a5b00a842860ac5b4a371f.js"></script>

Now we need to tell the OpenAPI tool to not generate the exception class. This is done in project file, so doubleclick on your `.csproj` file and find the `OpenApiReference` elements, you will have one for each Swagger file (or URL).

Add the following `Options` element inside _each_ `OpenApiReference`.

{% highlight xml %}
<Options>/AdditionalNamespaceUsages:MultipleServiceReferencesDemo /GenerateExceptionClasses:false</Options>
{% endhighlight %}

You may need expand self-closing tag so that you cann add elements inside.

The options contains two settings which will be added to the tool invocation. The first one, `/AdditionalNamespaceUsages`, tells it to add an additional `using` so that the code can reference our `ApiException`. Replace `MultipleServiceReferencesDemo` with the namespace of your `ApiException`. The second parameter skips exception classes generation.

After the change, your `csproj` should look similar to this:

<script src="https://gist.github.com/AlexSikilinda/bc58b9fcb7cd1c222279c3270aeb814d.js"></script>

Now you are able to build the project and consume multiple services from single project. If you are getting the same exception, remove `bin` and `obj` folder which will force VS to regenerate the code.

## Summary

- Referencing multiple OpenAPI services in single project is possible by defining `ApiException` manually and tweaking OpenAPI tool to use it.
- Sometimes it may be easier to create individual projects for each service.
- You can read [this github discussion](https://github.com/dotnet/aspnetcore/issues/18204) in the aspnetcore repo for more context.
- Consider using official Nuget package of the service you want to use, if it's available. This way you don't need to deal with swagger files at all.
- You can inspect the generated code by clicking _View Generated Code_ in _Serivce Reference_ menu.
