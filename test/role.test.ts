import { SynthUtils } from '@aws-cdk/assert';
import * as s3 from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/core';
import { GitHubActionsOidcProvider, GitActionsHubRole } from '../src';

test('snapshot', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  const provider = new GitHubActionsOidcProvider(stack, 'GitHubOidcProvider');
  new GitActionsHubRole(stack, 'GitHubRole', {
    provider: provider,
    repository: 'foo/bar',
  });

  // THEN
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('policies can be attached', () => {
  // GIVEN
  const stack = new Stack();
  const bucket = new s3.Bucket(stack, 'Bucket');
  const role = new GitActionsHubRole(stack, 'GitHubRole', {
    provider: GitHubActionsOidcProvider.forAccount(),
    repository: 'foo/bar',
    roleName: 'FooBarGitHubRole',
  });

  // WHEN
  bucket.grantRead(role);

  // THEN
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});