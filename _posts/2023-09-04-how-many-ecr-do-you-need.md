---
layout: post
title: "How many ECRs do you need?"
date: 2023-09-04 00:00:01
comments: true
analytics: true
tags: AWS DevOps
---

<img src='/public/images/aws/SingleEcrCustomAccount.png' alt="An AWS diagram showing an ECR service in a separate account, consumed by other accounts."/>

Depending on the size and complexity of your application you may use different strategies for grouping and securing your resources and environments.

Using multiple AWS accounts is a best practice for organizing your environments and defining clear security and billing boundaries.

Each environment requires ECR access for deployments, so the question is: do we create an ECR for each account or do we use one centralized ECR for all environments?
<br>

## Single ECR for multiple accounts

> Customers are adopting multi-account deployments in AWS given the improved security and separation of duties it provides. Some AWS services, like Amazon Elastic Container Registry (ECR), support scalability when a single instance is shared between accounts to reduce management overhead and increase visibility.
>
> <cite>[Sharing Amazon ECR repositories with multiple accounts using AWS Organizations](https://aws.amazon.com/blogs/containers/sharing-amazon-ecr-repositories-with-multiple-accounts-using-aws-organizations/)</cite>

The most straightforward approach is to add ECR to your "dev" account. We can also enable ECR access for other accounts using IAM later if needed:

<img src='/public/images/aws/SingleEcrMultipleAccounts.png' alt="An AWS diagram showing single ECR consumed by multiple environments (accounts)."/>

However, the preferred approach is a custom account dedicated solely to ECR while other accounts get access to images through IAM:

> Use a dedicated AWS account for Amazon ECR tasks, and use AWS Identity and Access Management (IAM) to control access to your container images.
>
> <cite>[Best practices for using Amazon ECR](https://docs.aws.amazon.com/prescriptive-guidance/latest/container-platform-management/choose-registry.html#amazon-ecr-best-practices)</cite>

This approach allows us to have absolutely identical environments, while our images are stored in a single ECR. This is **the preferred approach** according to Amazon ECR "best practices":

<img src='/public/images/aws/SingleEcrCustomAccount.png' alt="An AWS diagram showing an ECR service in a separate account, consumed by other accounts."/>

## An ECR per account

For large, distributed organizations with different teams focusing on a single aspect of the application lifecycle (e.g. development, security, platform, devops etc.), there is an option to use a separate ECR for each environment, which would "logically" look like this:

<img src='/public/images/aws/MultipleEcrMultipleAccounts.png' alt="A diagram showing multiple ECR for each environment. "/>

However, this approach is only viable for companies with dozens of dev teams and separate devops/platform teams. You can read more about this approach in the ["Amazon ECR in Multi-Account and Multi-Region Architectures"](https://aws.amazon.com/blogs/containers/amazon-ecr-in-multi-account-and-multi-region-architectures/) article.

## Summary

- The default approach is to have a **single ECR** in a separate, dedicated account with IAM controlling the access to your container images.
- Very large organizations with dozens of dev teams may decide to use a separate ECR for each environment, although this added complexity needs to be justified by very specific requirements. You can read more about it [here](https://aws.amazon.com/blogs/containers/amazon-ecr-in-multi-account-and-multi-region-architectures/).

