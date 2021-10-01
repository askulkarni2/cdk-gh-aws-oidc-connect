const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Apoorva Kulkarni',
  authorAddress: 'kuapoorv@amazon.com',
  cdkVersion: '1.125.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-gh-aws-oidc-connect',
  repositoryUrl: 'https://github.com/kuapoorv/cdk-gh-aws-oidc-connect.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
  ],
  cdkTestDependencies: [
    '@aws-cdk/aws-ecr',
  ],
  description: `
This construct is based on Aidan Steele\'s blog \
https://awsteele.com/blog/2021/09/15/aws-federation-comes-to-github-actions.html. \
Use this constuct to provision an AWS IAM OIDC identity provider and an IAM role \
that can be assumed by github-actions. See https://github.com/github/roadmap/issues/249 \
for details.`,
  devDeps: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
  ],
  codeCov: true,
  docgen: true,
});
project.synth();