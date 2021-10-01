import { SynthUtils } from '@aws-cdk/assert';
import * as ecr from '@aws-cdk/aws-ecr';
import * as iam from '@aws-cdk/aws-iam';
import { Stack } from '@aws-cdk/core';
import * as oidcConnect from '../src/index';

test('oidcConnect creates a role', () => {
  const stack = new Stack();
  new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repos: ['askulkarni2/cdk-gh-aws-oidc-connect'],
  });
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('oidcConnect creates a role with a managed policy', () => {
  const stack = new Stack();
  new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repos: ['askulkarni2/cdk-gh-aws-oidc-connect'],
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
    ],
  });
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('oidcConnect creates a role with an inline policy', () => {
  const stack = new Stack();
  new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repos: ['askulkarni2/cdk-gh-aws-oidc-connect'],
    policies: [
      new iam.Policy(stack, 'inline-policy'),
    ],
  });
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('oidcConnect role is granted access to an ECR repo', () => {
  const stack = new Stack();
  const oidcProvider = new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repos: ['askulkarni2/cdk-gh-aws-oidc-connect'],
  });
  const ecrRepo = new ecr.Repository(stack, 'test-repo');
  ecrRepo.grantPullPush(oidcProvider.roleToAssume);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});