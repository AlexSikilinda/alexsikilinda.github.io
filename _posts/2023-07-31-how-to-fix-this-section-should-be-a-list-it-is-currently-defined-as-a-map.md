---
layout: post
title: "How to fix 'This section should be a list (it is currently defined as a map).' in bitbucket-pipelines.yml"
date: 2023-07-31 00:00:01
comments: true
analytics: true
tags: DevOps Bitbucket
---

<img src='/public/images/bitbucket/BitbucketPipelineConfigurationError.png' alt="bitbucket pipeline with configuration error saying This section should be a list (it is currently defined as a map)"/>

We've all been there, editing `bitbucket-pipelines.yml` can be challenging. Bitbucket's online validator is very handy, but it can produce false positives sometimes.

In this article, we take a look at `bitbucket-pipelines.yml` which passes Bitbucket's validator but fails in the pipeline with `This section should be a list (it is currently defined as a map).` error. We also discuss tools that provide better local validation.

<br>

## What does this error mean?

It means you have an incorrectly formatted configuration file. Usually, Validator is able to "fail" the file, but in some corner cases it may be incorrectly displayed as "Valid".

One of the corner cases is a `step:` in `definitions:` section:

<img src='/public/images/bitbucket/BitbucketPipelineValidatorFalsePositive.png' alt="bitbucket validator incorrectly saying the config is valid"/>

As you may notice, the `&build` step has an incorrect `script:` section, but we still get the "green" result.

## What is 'a list' and 'a map'?

These are YAML primitives.

A **YAML list** (aka **collection** or **array**) is a block of code where each element of the list starts with a dash and space (`- `) on a new line:

```yaml
colors:
  - red
  - yellow
  - green
```

The same thing in JSON would look like this:

```json
"colors": ["red", "yellow", "green"]
```

A **map** (aka **hash** or **dictionary**) is a block of code that represents a set of key/value pairs separated by `: `. An example of a **YAML map**:

```yaml
product:
  type: apple
  color: red
  quantity: 42
```

In JSON you would represent the same object like this:

```json
"product": {
    "type": "apple",
    "color": "red",
    "quantity": 42
}
```

So now, the error message is clearer. A list (`- `) was expected, but a map (`: `) defined.
Indeed, our top-level `script:` is defined as a map, but Bitbucket correctly expects a `script:` element to be a list of commands:

```yaml
        script:
          name: "Build & Test & Generate Package"
          caches:
            - dotnetcore
          script:
            - dotnet --info
            - dotnet format --version
            - dotnet format --verify-no-changes
```

This type of errors is common if you copy/paste parts of code, and they are not very hard to recognize once you see this type of error. In our example we clearly wanted this list:

```yaml
        script:
          - dotnet --info
          - dotnet format --version
          - dotnet format --verify-no-changes
```

## Tools for `bitbucket-pipelines.yml` editing

Usually, I prefer to edit pipelines configuration in **Visual Studio Code**, but it wasn't able to catch this semantic mistake and I wouldn't blame it since the official validator doesn't catch it either. [Atlassian for VS Code](https://marketplace.visualstudio.com/items?itemName=Atlassian.atlascode) plugin fixes it, so I suggest installing it if you often work on `bitbucket-pipelines.yml`.

To my surprise, **Visual Studio 2022** is able to highlight this error automatically:

<img src='/public/images/bitbucket/VisualStudio2022DErrorInPipelines.png' alt="Visual Studio 2022 displaying a semantic error in bitbucket-pipelines.yml document"/>

It produces a slightly different, but correct, error - `Incorrect type. Expected "array".`

## Summary

- `This section should be a list (it is currently defined as a map).` indicates a semantic error in your `bitbucket-pipelines.yml` file. Check your elements and make sure you have **a list** (`- `) where it is expected.
- `list` and `map` in such errors refer to **YAML primitives**.
- In some corner cases, [the official validator](https://bitbucket-pipelines.prod.public.atl-paas.net/validator) does not report the error, but the pipeline fails during the build. It still makes sense to always check your config with the tool.
- [Atlassian for VS Code](https://marketplace.visualstudio.com/items?itemName=Atlassian.atlascode) improves the editor's validation and allows catching these kinds of semantic errors earlier.
- Consider using Visual Studio 2022 for `bitbucket-pipelines.yml` editing. It is able to  validate the config, sometimes producing better results than the official validator with no plugins.



