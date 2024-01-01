---
layout: post
title: "Deploy containerized ASP.NET apps to AWS ECS. Part II: ECR"
date: 2023-09-08 00:00:01
comments: true
analytics: true
tags: AWS DevOps Bitbucket
---

<img src='/public/images/aws/AwsDeploymentPartTwoEcr.png' alt="A diagram of AWS ECS deployment using Bitbucket Pipelines, ECR and CDK focusing on Elastic Container Registry. "/>

**Elastic Container Registry** or **ECR** is a service for storing [Docker images](/posts/create-docker-images-with-dotnet-publish/) in AWS. Images pushed to ECR can be used in other AWS services.

In this article, we explore how to create and configure ECR and also how to use `dotnet publish` with .NET 7+ apps to create images and push them to the registry.
<br>

## Prerequisites

[Part I of this series](posts/deploying-containerized-dotnet-app-to-aws-ecs/) covers our options for hosting Docker containers in AWS and gives a high-level overview of the services we are going to use.

We covered Docker image generation for ASP.NET projects in a separate series. [This post](/posts/create-docker-images-with-dotnet-publish/) describes how you can utilize `dotnet publish` to create images.

Although technically not related, consider reviewing [this post](/posts/publish-docker-image-to-azure-container-registry-with-dotnet-publish/) about publishing images to the Azure Container Registry and [this one](/posts/publish-images-to-azure-container-registry-from-bitbucket-pipelines/) describes automated image publishing from Bitbucket Pipelines.

Finally, in ["How many ECRs do you need?"](https://sikilinda.com/posts/how-many-ecr-do-you-need/) we discussed the best practices for ECR in a multi-account approach. For this series we are going to use the recommended "single ECR in a separate account" approach:

<img src='/public/images/aws/SingleEcrCustomAccount.png' alt="An AWS diagram showing an ECR service in a separate account, consumed by other accounts."/>

## Create Elastic Container Registry

How many accounts d
