const { AwsCdkConstructLibrary } = require('projen');

const AUTOMATION_TOKEN = 'GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'Apoorva Kulkarni',
  authorAddress: 'askulkarni2@gmail.com',
  cdkVersion: '1.125.0',
  keywords: ['aws-cdk', 'oidc', 'github', 'aws'],
  defaultReleaseBranch: 'main',
  name: 'cdk-gh-aws-oidc-connect',
  repositoryUrl: 'https://github.com/askulkarni2/cdk-gh-aws-oidc-connect.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-ecr',
  ],
  cdkTestDependencies: [
    '@aws-cdk/aws-ecr',
  ],
  description: `
This construct is based on Aidan Steele\'s blog \
https://awsteele.com/blog/2021/09/15/aws-federation-comes-to-github-actions.html. \
Use this constuct to provision an AWS IAM OIDC identity provider and an IAM role \
that can be assumed by github-actions.`,
  codeCov: true,
  docgen: true,
  depsUpgrade: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  },
  autoDetectBin: false,
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  autoApproveProjenUpgrades: true,
  releaseToNpm: true,
  pullRequestTemplateContents: [
    '',
    '----',
    '',
    '*By submitting this pull request, I confirm that my contribution is made under the terms of the Apache-2.0 license*',
  ],
});
project.addGitIgnore('cdk.out');
project.synth();