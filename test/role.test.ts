import { Match, Template } from '@aws-cdk/assertions';
import * as s3 from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/core';
import { GitHubActionsOidcProvider, GitHubActionsRole } from '../src';

test('snapshot', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  const provider = new GitHubActionsOidcProvider(stack, 'GitHubOidcProvider');
  new GitHubActionsRole(stack, 'GitHubRole', {
    provider: provider,
    repository: 'foo/bar',
  });

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('policies can be attached', () => {
  // GIVEN
  const stack = new Stack();
  const bucket = new s3.Bucket(stack, 'Bucket');
  const role = new GitHubActionsRole(stack, 'GitHubRole', {
    provider: GitHubActionsOidcProvider.forAccount(),
    repository: 'foo/bar',
    roleName: 'FooBarGitHubRole',
  });

  // WHEN
  bucket.grantRead(role);

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('"requiredSessionName" can be used to allow only specific sessions to assume the role', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new GitHubActionsRole(stack, 'GitHubRole', {
    provider: GitHubActionsOidcProvider.forAccount(),
    repository: 'foo/bar',
    requiredSessionName: 'bombombombom',
  });

  const template = Template.fromStack(stack);
  expect(template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: Match.arrayWith([ 
        Match.objectLike({
          Condition: {
            StringLike: {
              'token.actions.githubusercontent.com:sub': 'repo:foo/bar:*',
              'sts:RoleSessionName': 'bombombombom',
            }
          },
        })
      ])
    }
  }));
});