---
layout: post
title: "Deploy containerized ASP.NET apps to AWS ECS. Part II: ECR"
date: 2023-08-27 00:00:01
comments: true
analytics: true
tags: AWS DevOps Bitbucket
---

<img src='/public/images/aws/AwsDeploymentPartTwoEcr.png' alt="A diagram of AWS ECS deployment using Bitbucket Pipelines, ECR and CDK focusing on Elastic Container Registry. "/>

**Elastic Container Registry** or **ECR** is a service for storing [Docker images](/posts/create-docker-images-with-dotnet-publish/) on AWS. Images pushed to ECR can be used in other AWS services.

In this article, we explore how to create and configure ECR and also how to use `dotnet publish` with .NET 7+ apps to create images and push them to the registry.
<br>

## Prerequisites

[Part I of this series](posts/deploying-containerized-dotnet-app-to-aws-ecs/) covers our options for hosting Docker containers in AWS and gives a high-level overview of the services we are going to use.

We covered Docker image generation for ASP.NET projects in a separate series. [This post](/posts/create-docker-images-with-dotnet-publish/) describes how you can utilize `dotnet publish` to create images.

Although technically not related, consider reviewing [this post](/posts/publish-docker-image-to-azure-container-registry-with-dotnet-publish/) about publishing images to the Azure Container Registry and [this one](/posts/publish-images-to-azure-container-registry-from-bitbucket-pipelines/) describes automated image publishing from Bitbucket Pipelines.

Let's start creating our ECR, but before we need to answer a couple of questions.

## ECR in multi-account strategy

Depending on the size and complexity of your application you may use different strategies for grouping and securing your resources and environments.

Using multiple AWS accounts is a best practice for organizing your environments and defining clear security and billing boundaries.

A typical application has at least two environments (and corresponding AWS accounts):
- **production** environment, which serves real users
- **dev** environment, used for testing purposes

Each environment requires ECR access for deployments, so the question is: do we create an ECR for each account or do we use one centralized ECR for all environments?

### Single ECR for multiple accounts

> Customers are adopting multi-account deployments in AWS given the improved security and separation of duties it provides. Some AWS services, like Amazon Elastic Container Registry (ECR), support scalability when a single instance is shared between accounts to reduce management overhead and increase visibility.
>
> <cite>[Sharing Amazon ECR repositories with multiple accounts using AWS Organizations](https://aws.amazon.com/blogs/containers/sharing-amazon-ecr-repositories-with-multiple-accounts-using-aws-organizations/)</cite>

The most straightforward approach is to add ECR to your "dev" account. We also can enable ECR access for other accounts using IAM later, if needed:

<img src='/public/images/aws/SingleEcrMultipleAccounts.png' alt="An AWS diagram showing single ECR consumed by multiple environments (accounts)."/>

However, the preferred approach is a custom account dedicated solely to ECR while other accounts get access to images through IAM:

> Use a dedicated AWS account for Amazon ECR tasks, and use AWS Identity and Access Management (IAM) to control access to your container images.
>
> <cite>[Best practices for using Amazon ECR](https://docs.aws.amazon.com/prescriptive-guidance/latest/container-platform-management/choose-registry.html#amazon-ecr-best-practices)</cite>

This approach allows us to have absolutely identical environments, while our images are stored in a single ECR. This is **the preferred approach** according to Amazon ECR "best practices":

<img src='/public/images/aws/SingleEcrCustomAccount.png' alt="An AWS diagram showing an ECR service in a separate account, consumed by other accounts."/>

### Multiple ECRs for multiple accounts

For large, distributed organizations where there are different teams for each aspect of the application lifecycle (e.g. development, security, platform, devops etc.), there is an option to use a separate ECR for each environment, which would "logically" look like this:

<img src='/public/images/aws/MultipleEcrMultipleAccounts.png' alt="A diagram showing multiple ECR for each environment. "/>

However, this approach is only viable for companies with dozens of dev teams and separate devops/platform teams. You can read more about this approach in ["Amazon ECR in Multi-Account and Multi-Region Architectures"](https://aws.amazon.com/blogs/containers/amazon-ecr-in-multi-account-and-multi-region-architectures/) article.


### Read More
https://docs.aws.amazon.com/prescriptive-guidance/latest/container-platform-management/choose-registry.html

https://aws.amazon.com/blogs/containers/amazon-ecr-in-multi-account-and-multi-region-architectures/

## Create Elastic Container Registry

How many accounts d
