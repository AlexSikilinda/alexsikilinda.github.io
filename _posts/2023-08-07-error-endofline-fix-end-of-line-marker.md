---
layout: post
title: "'error ENDOFLINE: Fix end of line marker.' in CI but not locally"
date: 2023-08-07 00:00:01
comments: true
analytics: true
tags: DevOps .NET C# 
---

<img src='/public/images/errorEndofline/ErrorEndoflineInBitbucket.png' alt="error endofline fix end of line marker in Bitbucket Pipeline after dotnet format command"/>

In [a previous article](/posts/fail-bitbucket-pipeline-if-dotnet-code-is-not-formatted/) we explored how we can enforce code style in a solution with `dotnet format --verify-no-changes`.

Today we are discussing a rule that can be enabled in the `.eidtorconfig` file and potentially interfere with your local git settings so that `dotnet format` fails in the CI build but produces no errors locally.
<br>

## The problem

`dotnet format` will use a set of default rules, however, we can customize it with `.editorconfig` file inside our solution and enable additional validations.

One of the rules we can enable is **New Line** under **New line preferences** in the **Whitespace** configuration section.

It, as you may already know, allows us to enforce a line ending. The options are: 

- Newline (\\\\n)
- Carriage Return (\\r)
- Carriage Return + Newline (\\r\\n)

<img src='/public/images/errorEndofline/VisualStudioEditorConfig.png' alt="Visual Studio editorconfig editor with whitespace rules"/>

Windows uses the default ending of Carriage Return + Newline `\r\n` _aka_ `CRLF`, whereas Unix-based systems prefer Newline `\\n` _aka_ line feed - `LF`.

Git for Windows allows automatic replacement of Windows-like `CRLF` endings with Unix-default `LF`, and, if the setting is enabled, Git does it on each checkin and checkout. It means that locally you always have `CRLF` endings, but remote repos have Unix-friendly `LF`.

With **Carriage Return + Newline (\\r\\n)** option enabled in `.editorconfig` and `CRLF` -> `LF` automatic replacement in Git, `dotnet format --verify-no-changes` succeeds locally, but fails in a CI build with this error:

```
error ENDOFLINE: Fix end of line marker. Replace 2 characters with '\r\n\r\n'.
```

If you remember that Git can silently change the endings, the error is quite straightforward, otherwise it may be very confusing since you cannot reproduce it locally.

## The fix

Of course, you can just disable Git `CRLF` -> `LF` replacement, but it doesn't solve the problem for other people working on the same project.

So a better approach would be modifying the `.gitattributes` file in your root folder, which will tell Git the line endings we expect in the repo. Add the following line in your `.gitattributes` file:

```
* text eol=crlf
```

This will tell Git that we are using `CRLF` endings for all text files and it will not try to replace it with `LF` for this repo.

## Summary

- Git end-of-line (eol) conversion can interfere with `.editorconfig` **New Line** rule.
- `dotnet format --verify-no-changes` can fail with `error ENDOFLINE: Fix end of line marker. Replace 2 characters with '\r\n\r\n'.` error in a CI build but succeed locally if Git eol conversion is enabled.
- We can instruct Git to respect `CRLF` endings in `.gitattributes` which will enforce it for everyone on the team.
- Keep your line endings synchronized between `.gitattributes` and `.editorconfig`.
- [Read more](https://www.git-scm.com/docs/gitattributes) about `.gitattributes` file.
- [Read why](https://devblogs.microsoft.com/oldnewthing/20040318-00/?p=40193) Windows uses `CRLF` as the default ending.