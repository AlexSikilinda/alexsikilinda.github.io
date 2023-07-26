---
layout: post
title: "Nullable reference types and model binding in ASP.NET"
date: 2022-07-03 00:00:01
tags: .NET ASP.NET C#
comments: true
analytics: true
---

<img src='/public/images/NullableProject.png' alt="Nullable reference type project setting in .NET"/>

**Nullable reference types** - a comparatively new feature of C# which helps (to some extent) to deal with probably the most common bug - `NullReferenceException`. The feature was introduced in C# 8.0, and the main idea behind it is a new compiler analyzer which produces warnings if you try to access (or a better word - dereference) potentially nullable reference type.

For old projects you can enable this feature by adding `<Nullable>enable</Nullable>` line to .csproj file. For new ASP.NET projects this feature is enabled by default, but you can disable it by removing the corresponding line from .csproj.
<br>

Let's create a new ASP.NET 6 application and check the default `WeatherForecast`:

{% highlight csharp %}
public class WeatherForecast
{
public DateTime Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }

}
{% endhighlight %}

As you can see, `Summary`'s type is `string?` which didn't make sense before C# 8.0. But now, since the nullable reference type feature is enabled, all reference types, by design, are considered non-nullable. This means they have to have a value (at least from compiler perspective). And the way to tell the compiler that we want to be able to assign `null`, and thus make the property not required, is to add `?` to the type. Basically, it's the same way we used to mark value types as nullable, which kind of makes sense.

Let's try to change `Summary`'s type from `string?` to just `string`. The first thing we notice - there's a new compiler warning:

> Warning CS8618 Non-nullable property 'Summary' must contain a non-null value when exiting constructor. Consider declaring the property as nullable.

What happens here? C# compiler sees that `Summary` field is not marked as nullable, but there is no default value, and there is no constructor which initializes the property. This means that if you create an instance of type `WeatherForecast`, the default value of `Summary` will be null. Which violates the "non-nullable" rule.

Let's ignore the warning for now, and create a new POST method accepting `WeatherForecast` as a parameter:

{% highlight csharp %}
[HttpPost(Name = "UpdateWeatherForecast")]
public IActionResult UpdateWeatherForecast(WeatherForecast weatherForecast)
{
return Ok("Updated");
}
{% endhighlight %}

Run the app, open the swagger page and try to make a request without `Summary`:

<img src='/public/images/SummaryPostResponse.png' alt="ASP.NET consider non nullable fields as required in model binding"/>

As you can see, ASP.NET is smart enough to figure out that `Summary` field is required (because it is not nullable), and we are getting 400 Bad Request with `The Summary field is required.` error. Basically, it implicitly adds `[Required]` attribute to all non-nullable reference types. This is default behaviour since ASP.NET Core 3, and you can disable it with an MvcOption called [SuppressImplicitRequiredAttributeForNonNullableReferenceTypes](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.mvcoptions.suppressimplicitrequiredattributefornonnullablereferencetypes?view=aspnetcore-6.0).

## The warning

But what if we, like all good developers, don't want to have any warnings in our solution? Well, we can add a constructor in `WeatherForecast` and initialize all the properties there. (We can even make `WeatherForecast` immutable, but it's a topic for another discussion). Let's do it:

{% highlight csharp %}
public class WeatherForecast
{
public WeatherForecast(DateTime date, int temperatureC, string summary)
{
Date = date;
TemperatureC = temperatureC;
Summary = summary;
}

    public DateTime Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string Summary { get; set; }

}
{% endhighlight %}

The warning is gone, the compiler sees that the only option to create `WeatherForecast` is to use the new constructor containing `summary` paramter, and it will be able to validate that `summary` is not null in the invoking code. The problem solved, but one can argue the new constructor does look a bit strange. But what can we do?

## Record types

C# 9.0 [introduces](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9#record-types) a new **record** type that allows you to define our `WeatherForecast` more concisely (in this case the record will also be immutable):

{% highlight csharp %}
public record WeatherForecast(
DateTime Date,
int TemperatureC,
string Summary)
{
public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
{% endhighlight %}

And guess what? ASP.NET Model Binding is able to deserialize these new records, so you can use them as action parameters!
Much better, isn't it?

## Summary (and tips)

- Enabling the nullable reference type feature is a potential breaking change in existing ASP.NET projects since `[Required]` attribute will be added implicitly to nullable reference types by default.
- New projects are created with the feature enabled.
- Try to embrace and use new nullable reference type approach, it will save a lot of time in future;
- Do not ignore compiler warnings, they are almost always useful. Consider establishing zero warnings policy for high-quality code.
- Consider using new C# 9.0 **records** as parameters instead of classes.
- [Read more](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/model-binding?view=aspnetcore-6.0) about model binding in ASP.NET.
