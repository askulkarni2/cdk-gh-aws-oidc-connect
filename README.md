[![NPM version](https://badge.fury.io/js/cdk-gh-aws-oidc-connectb.svg)](https://badge.fury.io/js/cdk-gh-aws-oidc-connect)
[![PyPI version](https://badge.fury.io/py/cdk-gh-aws-oidc-connect.svg)](https://badge.fury.io/py/cdk-gh-aws-oidc-connect)
![Release](https://github.com/askulkarni2/cdk-gh-aws-oidc-connect/workflows/Release/badge.svg)

# cdk-gh-aws-oidc-connect

High level CDK construct to provision an AWS IAM Role with an OIDC Connect Provider that can be assumed by GitHub Actions to invoke AWS APIs. This can be used to for example to push a docker image to an ECR repo as shown in the example below. This concept is illustrated in [Aidan Steele's](https://github.com/aidansteele) excellent [blog](https://awsteele.com/blog/2021/09/15/aws-federation-comes-to-github-actions.html) from which this construct is inspired.

## Sample

```ts
import * as ecr from '@aws-cdk/aws-ecr';
import * as iam from '@aws-cdk/aws-iam';
import { GitHubActionsAwsOidcConnect } from 'cdk-gh-aws-oidc-connect';
import * as cdk from '@aws-cdk/core';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'GitHubOidcStack');

// Create OIDC Connect Provider
const oidcProvider = new GitHubActionsAwsOidcConnect(stack, 'GitHubOidcConnect', {
  repos: ['askulkarni2/cdk-gh-aws-oidc-connect'],
});

// Create an ECR Repo
const ecrRepo = new Repository(stack, 'EcrRepo');

// Grant the OIDC Provier role access to pull/push to ECR repo
ecrRepo.grantPullPush(oidcProvider.roleToAssume);

new cdk.CfnOutput(stack, 'ecr-repo', {
  value: ecrRepo.repositoryName,
});

new cdk.CfnOutput(stack, 'role-to-assume', {
  value: oidcProvider.roleToAssume.roleArn,
});
```

## Deploy Stack

```sh
cdk deploy

...
✅  GitHubOidcStack

Outputs:
GitHubOidcStack.ecrrepo = githuboidcstack-ecrrepobb83a592-8sj613ya3r2t
GitHubOidcStack.roletoassume = arn:aws:iam::XXXXXXXXX:role/GitHubOidcStack-iamroletoassume09F64513-3MUV87WTCIUU
```

## Setup Github Actions

Create an action such as...

```yaml
name: integration-test
on:
  pull_request: {}
  workflow_dispatch: {}
  push:
    branches:
      - main
permissions:
  id-token: write
  contents: write
jobs:
  deploy:
    name: Publish to ECR
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Configure AWS credentials from Test account
      uses: aws-actions/configure-aws-credentials@b8c74de753fbcb4868bf2011fb2e15826ce973af
      with:
        role-to-assume: ${{ secrets.ROLE_TO_ASSUME }}
        aws-region: us-west-2

    - name: Login to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v1

    - name: Build, tag, and push image to Amazon ECR
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        ECR_REPOSITORY: githuboidcstack-ecrrepobb83a592-8sj613ya3r2t
        IMAGE_TAG: ${{ github.sha }}
      run: |
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
```
