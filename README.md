[![npm version](https://badge.fury.io/js/cdk-gh-aws-oidc-connect.svg)](https://badge.fury.io/js/cdk-gh-aws-oidc-connect)
[![release](https://github.com/askulkarni2/cdk-gh-aws-oidc-connect/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/askulkarni2/cdk-gh-aws-oidc-connect/actions/workflows/release.yml)
[![CodeQL](https://github.com/askulkarni2/cdk-gh-aws-oidc-connect/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/askulkarni2/cdk-gh-aws-oidc-connect/actions/workflows/codeql-analysis.yml)

# cdk-gh-aws-oidc-connect

High level CDK construct to provision an AWS IAM Role with an OIDC Connect Provider that can be assumed by GitHub Actions to invoke AWS APIs. This can be used to for example to push a docker image to an ECR repo as shown in the example below. This concept is illustrated in [Aidan Steele's](https://github.com/aidansteele) excellent [blog](https://awsteele.com/blog/2021/09/15/aws-federation-comes-to-github-actions.html) from which this construct is inspired.

This library includes 3 constructs:

* `GitHubActionsOidcProvider` - defines an OIDC provider for GitHub actions (can only be one in each account).
* `GitHubActionsRole` - defines an IAM role that can be assumed from a specific GitHub repository
* `GitHubActionsAwsOidcConnect` - combines both the provider and the role.

### GitHub OIDC Provider

In order to define the IAM Role, you'll first need to create an OIDC provider
for GitHub in your account.

These are the settings for the GitHub OIDC provider. You can create the provider
through the AWS IAM console or using the `GitHubOidcProvider` construct as
demonstrated below:

Settings:

* URL: `https://token.actions.githubusercontent.com`
* Client IDs: `sigstore`
* Thumbprints: `a031c46782e6e6c662c2c87c76da9aa62ccabd8e`

Or via CDK:

```ts
import { GitHubOidcProvider } from 'cdk-github-role';
import { App, Stack } from '@aws-cdk/core';

const app = new App();
const stack = new Stack(app, 'GitHubOidcProviderStack');
new GitHubOidcProvider(stack, 'GitHubOidcProvider');

app.synth();
```

### IAM Roles for GitHub Actions

Then, you can create an IAM role that grants a specific GitHub repository
certain permissions in the account. Use `GitHubOidcProvider.forAccount()` to
obtain a reference to the singleton provider.

```ts
import { GithubRole } from 'cdk-github-role';

// must exist in advance.
const provider = GitHubOidcProvider.forAccount();

const barRole = new GitHubRole(this, 'GitHubFooBarRole', {
  provider: provider,
  repository: 'foo/bar',
  roleName: 'FooBarGitHubRole',
  externalIds: ['Pa$$w0rd'], // <-- this can be used to further restrict who can assume the role
});

const gooRole = new GitHubRole(this, 'GitHubFooGooRole', {
  provider: provider,
  repository: 'foo/goo',
  roleName: 'GitHubFooGooRole',
});

// now we can grant it permissions. for example:
bucket.grantRead(barRole);
bucket.grantWrite(gooRole);
```

## Using the role in GitHub workflows

To assume this role from a GitHub Workflow, add the
[aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)
GitHub action step to your workflow. You can explicitly specify the role name
under `role-to-assume` or store the role inside a GitHub secret as the example
below shows. Additionally, you can specify a `role-external-id` and specify
`externalIds` when you define the role to ensure that only specific
workflows in your repository can assume this role.

```yaml
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@b8c74de753fbcb4868bf2011fb2e15826ce973af
      with:
        role-to-assume: GitHubFooGooRole      # <-- required
        role-external-id: ${{ secrets.ROLE_EXTERNAL_ID }} # <-- optional (put in a secret!)
        aws-region: us-west-2
```


## Example

The following examples demonstrates how to use `GitHubActionsAwsOidcConnect` to
deploy an OIDC provider and a single IAM role to an AWS account:

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
  externalIds: ['Pa$$w0rd'],
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

Deploy the stack and record the name of the role to assume:

```sh
$ cdk deploy

...
✅  GitHubOidcStack

Outputs:
GitHubOidcStack.ecrrepo = githuboidcstack-ecrrepobb83a592-8sj613ya3r2t
GitHubOidcStack.roletoassume = arn:aws:iam::XXXXXXXXX:role/GitHubOidcStack-iamroletoassume09F64513-3MUV87WTCIUU
```

Store the following secrets in your GitHub repository:

* `ROLE_TO_ASSUME`: `arn:aws:iam::XXXXXXXXX:role/GitHubOidcStack-iamroletoassume09F64513-3MUV87WTCIUU`
* `ROLE_EXTERNAL_ID`: `Pa$$w0rd`

Create a GitHub workflow:

```yaml
name: integration-test
on:
  pull_request: {}
  workflow_dispatch: {}
  push:
    branches:
      - main
permissions:
  id-token: write # <-- required
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
        role-to-assume: ${{ secrets.ROLE_TO_ASSUME }}      # <-- required
        role-external-id: ${{ secrets.ROLE_EXTERNAL_ID }} # <-- optional
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
