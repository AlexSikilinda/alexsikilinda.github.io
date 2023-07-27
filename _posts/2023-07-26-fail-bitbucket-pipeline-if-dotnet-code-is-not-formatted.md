---
layout: post
title: "Fail Bitbucket Pipeline if .NET code is not formatted"
date: 2023-07-26 00:00:01
tags: .NET C# Bitbucket DevOps
comments: true
analytics: true
---

<img src='/public/images/bitbucket/FailedBitbucketPipeline.png' alt="Bitbucket pipeline failed with 'error WHITESPACE: Fix whitespace formatting. Delete 12 characters.' error from dotnet format"/>

Correctly formatted code does not guarantee your codebase is of high quality, but the opposite is true: poorly formatted code almost always guarantees you are working with a bad, unprofessional codebase.

Even though you can probably get away with minor stylistic imperfections here and there in small projects, where only a few developers are working together, the bigger the team the more strict everyone should be about the codebase.

Not only does it make code easier to navigate and understand, but it also prevents merge conflicts and lays the foundation of high-quality code we all want to work with.

In this article we explore how we can fail bitbucket pipeline builds if there are formatting issues in .NET code and thus ensure our projects have only formatted code checked in.
<br>

## TLDR

Add the following step to your `bitbucket-pipelines.yml` file:

```yml
image: mcr.microsoft.com/dotnet/sdk:7.0

pipelines:
  branches:
    master:
      - step:
          name: "Check code formatting"
          script:
            - dotnet --info
            - dotnet format --version
            - dotnet format --verify-no-changes
```

`dotnet format --verify-no-changes` terminates with a non zero exit code if any files would have been formatted. A non zero code also terminates Bitbucket Pipeline and thus the whole build is considered failed and no other steps are executed.

You can inspect the tool's output in Bitbucket Pipeline's Build area. As an example, on the screenshot above the build failed with `error WHITESPACE: Fix whitespace formatting. Delete 12 characters.` error in `Program.cs`.

`dotnet --info` and `dotnet format --version` are informational commands and do not affect the output of `dotnet format --verify-no-changes`, but it's nice to be able to see the version of .NET and `dotnet format` tool being used in the pipeline, in case your local results differ from what you are getting during the build.

## Is formatted code that important?

It is. Numerous books and articles have been written about this, and everyone seems to agree having consistent code style rules is beneficial for software projects.

> The visual and intellectual enjoyment of well-formatted code is a pleasure that few nonprogrammers can appreciate. But programmers who take pride in their work derive great artistic satisfaction from polishing the visual structure of their code.
>
> [...]
>
> Over the life of a project, attention to such details makes a difference in the
> initial quality and the ultimate maintainability of the code you write.
>
> <cite>Code Complete, 2nd edition</cite> by Steve McConnell

Poorly formatted code makes me question myself: if the author didn't pay attention to such an important detail as code formatting, did he or she pay enough attention to make sure the actual logic is correct? Unformatted code makes me suspicious: now I can't just read the code, I need to validate it since I don't really trust the author, even if, and especially if the author is myself some time ago.

> The functionality that you create today has a good chance of changing in the next
> release, but the readability of your code will have a profound effect on all the changes
> that will ever be made. The coding style and readability set precedents that continue to
> affect maintainability and extensibility long after the original code has been changed
> beyond recognition. Your style and discipline survives, even though your code does not.
>
> <cite>Clean Code</cite> by Rober C. Martin

So yes, well formatted code is important enough to enforce it.

## What is `dotnet format`?

> dotnet format is a code formatter that applies style preferences to a project or solution. Preferences will be read from an .editorconfig file, if present, otherwise a default set of preferences will be used.
>
> At this time dotnet-format is able to format C# and Visual Basic projects with a subset of supported .editorconfig options.
>
> <cite>[Official Github page of dotnet format](https://github.com/dotnet/format)</cite>

The tool is a part of .NET SDK which means you can use it anywhere you can build .NET code. Since our Bitbucket pipeline uses the official .NET SDK image, `image: mcr.microsoft.com/dotnet/sdk:7.0`, we can use `dotnet format` inside our steps with no additional configuration.

## Adjusting formatting preferences with .editorconfig

`.editorconfig` allows you to enforce a particular set of coding styles for everyone who works on the project. It affects Visual Studio formatting setting as well as `dotnet format` tool.

You can add `.editorconfig` by right-clicking on `.csproj` file and selecting **Add > New EditorConfig**. This will create an empty `.editorconfig` file. You can also generate `.editorconfig` based on your VS style settings by going to **Tools > Options > Text Editor > C# > Code Style > General** and clicking **Generate .editorconfig file from settings**.

Visual Studio provides a graphical interface for `.editorconfig` files which makes it very easy to use:

<img src='/public/images/bitbucket/EditorconfigVisualEditor.png' alt="Visual Studio .editorconfig editor"/>

## Setting up Visual Studio to automatically format on save

You can always use `dotnet format` locally to format all the codebase, but you can also format code automatically by enabling **Code Cleanup on Save** in Visual Studio 2022.

Navigate to **Tools > Options > Text Editor > Code Cleanup** and check the corresponding checkbox.

## Summary

- Adding a step with `dotnet format --verify-no-changes` to your bitbucket pipeline will help to keep your code formatted.
- You can also run `dotnet format` command locally to format the codebase.
- You should set up Visual Studio to automatically format code on save.
- You can modify the rules in Editorconfig but the defaults are good enough to not touch it.
