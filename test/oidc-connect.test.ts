import { Match, Template } from '@aws-cdk/assertions';
import * as ecr from '@aws-cdk/aws-ecr';
import * as iam from '@aws-cdk/aws-iam';
import { Stack } from '@aws-cdk/core';
import * as oidcConnect from '../src';

test('oidcConnect creates a role', () => {
  const stack = new Stack();
  new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repo: 'askulkarni2/cdk-gh-aws-oidc-connect',
  });



  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});

test('oidcConnect creates a role with a managed policy', () => {
  const stack = new Stack();
  new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repo: 'askulkarni2/cdk-gh-aws-oidc-connect',
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
    ],
  });

  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});

test('oidcConnect creates a role with an inline policy', () => {
  const stack = new Stack();
  new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repo: 'askulkarni2/cdk-gh-aws-oidc-connect',
    policies: [
      new iam.Policy(stack, 'inline-policy'),
    ],
  });

  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});

test('oidcConnect role is granted access to an ECR repo', () => {
  const stack = new Stack();
  const oidcProvider = new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repo: 'askulkarni2/cdk-gh-aws-oidc-connect',
  });
  const ecrRepo = new ecr.Repository(stack,
'test-repo');

  ecrRepo.grantPullPush(oidcProvider.roleToAssume);
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});

test('allows specifying role name', () => {
  const stack = new Stack();

  new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repo: 'askulkarni2/cdk-gh-aws-oidc-connect',
    roleName: 'my-role-name'
  });

  const template = Template.fromStack(stack);
  expect(template.hasResourceProperties('AWS::IAM::Role', {
    RoleName: 'my-role-name',
  }));
});

test('allows specifying session name condition', () => {
  const stack = new Stack();

  new oidcConnect.GitHubActionsAwsOidcConnect(stack, 'oidc-connect', {
    repo: 'askulkarni2/cdk-gh-aws-oidc-connect',
    requiredSessionName: 'foooom',
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