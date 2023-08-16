---
layout: post
title: "'pwsh' is not recognized as an internal or external command, operable program or batch file"
date: 2023-08-16 00:00:01
description: Fix 'pwsh' is not recognized as an internal or external command, operable program or batch file
comments: true
analytics: true
tags: .NET PowerShell Quickfix
---

<img src='/public/images/powershell/powershell.png' alt="a console with pwsh is not recognized as an internal or external command error message"/>

**PowerShell** used to be a Windows-only tool based on .NET Framework. Starting from `v6`, PowerShell is an open-source, .NET Core-based solution you can run on Linux, MacOS, and Linux.
<br>

Starting from PowerShell `v7`, the PowerShell executable has been renamed to `pwsh`:

> The binary name for PowerShell has been changed from `powershell(.exe)` to `pwsh(.exe)`. This change provides a deterministic way for users to run PowerShell on machines and support side-by-side installations of Windows PowerShell and PowerShell.
>
> <cite>[PowerShell executable changes](https://learn.microsoft.com/en-us/powershell/scripting/whats-new/differences-from-windows-powershell?view=powershell-7.3#renamed-powershellexe-to-pwshexe)</cite>

Going forward, if you want to use `v7+` version (which should be the default approach), you need to use `pwsh` instead of `powershell`. Using `powershell` is also possible, but it will not work on non-Windows devices and will use **Windows PowerShell v5** on Windows ones.

## 'pwsh' missing

If **PowerShell** `v7+` is not installed, you will get the following error:

```console
'pwsh' is not recognized as an internal or external command, operable program or batch file.
```

## Installing PowerShell v7 (and newer)

To fix the error above you need to install the new PowerShell. There are [various ways](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.3) to do it, but the easiest way for .NET developers is to execute the following command:

```console
dotnet tool update --global PowerShell
```

It will update or install the latest version of PowerShell, and `pwsh` command will be available in your command line.

## Summary

- Cross-platform **PowerShell** was a natural reaction to cross-platform **.NET Core**.
- Starting from `v6` you can run **PowerShell** anywhere.
- In `v7` the executable was renamed to `pwsh` to remove potential conflicts with legacy **Windows PowerShell v5** which still uses `powershell` command.
- `'pwsh' is not recognized...` message indicates PowerShell `v7+` is not installed.
- To install the latest PowerShell execute `dotnet tool update --global PowerShell` in your command line.
- PowerShell documentation is [here](https://learn.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.3).




