---
layout: post
title: "Deploy containerized ASP.NET apps to AWS ECS. Part I: A high-level overview"
date: 2023-08-21 00:00:01
comments: true
analytics: true
description: In this blog post we review the options AWS has to run Docker images. After giving a high-level overview of the services we select the stack consisting of CDK, ECR, ECS and Fargate.
tags: AWS DevOps Bitbucket
---

<img src='/public/images/aws/AwsDeploymentPartOneAnOverview.png' alt="A diagram of AWS ECS deployment using Bitbucket Pipelines, ECR and CDK. The word in the middle says 'Overview' "/>

In this series of posts, we explore everything needed to deploy and run a containerized ASP.NET application on **AWS**.

We'll start by creating an **AWS ECR** (Elastic Container Registry) to store the docker images of our application. We'll create a **Bitbucket Pipeline** to build a docker image each time we push our code and publish it to the ECR.

Next, we are going to utilize **AWS CDK** to define AWS resources and deploy our container to **AWS ECS** (Elastic Container Service).

At the end of the series, we are going to have a completely automated CI/CD pipeline to deploy our .NET web app to AWS, with the app's infrastructure managed by CDK code.

Today, in the first part, we'll try to understand what all these services are for and what other options for containerized web apps are there in AWS.
<br>

## What service should I use to run a docker container on AWS?

The answer can be a little bit more complicated than expected. There are [a lot of AWS services](https://aws.amazon.com/getting-started/decision-guides/containers-on-aws-how-to-choose/) supporting docker containers, but all the services can be spread into 3 logical layers:

<img src='/public/images/aws/AwsContainers.png' alt="Three layers of services supporting docker containers in AWS "/>

To run a container we need to pick a **"compute" service** and an **orchestrator**. There is a layer on top of **orchestrators** with services that can hide the lower layer's complexity and make it easier for us to consume an orchestrator. In AWS, this top layer is often called **provisioning**.

## Compute capacity

Compute capacity or just "capacity" is a layer with services where our docker containers will "physically" run. We do not consider on-premise scenarios, so the only two options for us are **AWS Fargate** and **Amazon EC2**.

> **Amazon EC2 (Amazon Elastic Compute Cloud)** allows you to run your containers on virtual machines that you manage.
>
> <cite>[Choosing an AWS container service](https://aws.amazon.com/getting-started/decision-guides/containers-on-aws-how-to-choose/)</cite>, AWS Documentation

> **AWS Fargate** is a serverless compute engine for containers that allows you to run containers without managing the underlying infrastructure. With Fargate, you can launch and scale containers without worrying about the underlying EC2 instances.
>
> <cite>[Choosing an AWS container service](https://aws.amazon.com/getting-started/decision-guides/containers-on-aws-how-to-choose/)</cite>, AWS Documentation

We are going to use **AWS Fargate** for simplicity since it means we don't have to manage an **EC2** server. EC2 is a viable option if you need full control of your "compute" infrastructure.

## Orchestrators

There are 3 options for container orchestration on AWS: **EKS**, **ECS** and **ROSA**.

> **Amazon ECS (Elastic Container Service)** is a fully managed container orchestration service and is ideal for organizations that want a simple and cost-effective way to deploy and manage containerized applications.
>
> <cite>[Choosing an AWS container service](https://aws.amazon.com/getting-started/decision-guides/containers-on-aws-how-to-choose/)</cite>, AWS Documentation

> **Amazon EKS (Elastic Kubernetes Service)** is a fully-managed Kubernetes service that allows you to run and manage Kubernetes clusters on AWS.
>
> <cite>[Choosing an AWS container service](https://aws.amazon.com/getting-started/decision-guides/containers-on-aws-how-to-choose/)</cite>, AWS Documentation

>  **ROSA (Red Hat OpenShift Service on AWS)** is a fully-managed OpenShift service that allows you to run and manage OpenShift clusters on AWS. It is a good option for customers who are already running OpenShift on premises.
>
> <cite>[Choosing an AWS container service](https://aws.amazon.com/getting-started/decision-guides/containers-on-aws-how-to-choose/)</cite>, AWS Documentation

Unfortunately, I know nothing about **ROSA**, so it leaves us with **EKS** and **ECS**.

If you are familiar with **Kubernetes (K8s)** and want to utilize its open-source ecosystem, or you don't want to lock in yourself with a cloud provider - choose **EKS**.

If you don't have much experience with K8s or want a simplified workflow - **ECS** is your choice.

For our tutorial, we are going to use **ECS**, although the concepts in **ECS** and **EKS** are similar.

## CDK and ECR

We are going to use **CDK (Cloud Development Kit)** to define our infrastructure as code (**IaC**). CDK allows us to synthesize and deploy **Cloud Formation** templates that will update our **ECS** tasks with new images from **ECR (Elastic Container Registry)**.

There are a lot of other options on this layer, so it is opinionated, but **CDK + CloudFormation** gives us needed flexibility and transparency for our infrastructure, ensuring all infrastructure changes are visible to everyone in the team and can be reviewed during regular PRs.

## Summary

In this blog post we reviewed general concepts concerning running Docker containers on AWS infrastructure. We have reviewed related services and picked the ones we are going to use in this series: **CDK + ECR + ECS + Fargate**. CI/CD process will be automated inside **Bitbucket Pipelines**.

In the next post, we are going to start with **ECR** service and **Bitbucket Pipelines** setup.

## Useful links

- [Choosing an AWS container service](https://aws.amazon.com/getting-started/decision-guides/containers-on-aws-how-to-choose/)
- [AWS Summit DC 2022 - You have a container image: Now what?](https://www.youtube.com/watch?v=tFvsXyy7ubA&ab_channel=AWSEvents)
- [AWS CloudFormation](https://aws.amazon.com/cloudformation/)
- [AWS Cloud Development Kit](https://aws.amazon.com/cdk/)
- [AWS ECS](https://aws.amazon.com/ecs/)
- [Kubernetes](https://kubernetes.io/)
