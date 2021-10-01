#!/usr/bin/env node

import { Repository } from '@aws-cdk/aws-ecr';
import * as cdk from '@aws-cdk/core';
import { GitHubActionsAwsOidcConnect } from '../';

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