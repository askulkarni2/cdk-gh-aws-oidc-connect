import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export interface GitHubActionsAwsOidcConnectProps {
  /**
   * List of GitHub repositories which will assume the IAM role.
   * E.g. ['aidansteele/aws-federation-github-actions']
   */
  readonly repos: Array<string>;

  /**
   * A list of IAM policies.
   */
  readonly policies?: Array<iam.Policy>;

  /**
   * A list of Managed IAM policies.
   */
  readonly managedPolicies?: Array<iam.IManagedPolicy>;
}

export class GitHubActionsAwsOidcConnect extends cdk.Construct {

  /**
   * This is the role GitHub Actions can assume for the repos provided.
   */
  public roleToAssume: iam.Role;

  constructor(scope: cdk.Construct, id: string, props: GitHubActionsAwsOidcConnectProps) {
    super(scope, id);

    const repos = props.repos;
    // TODO: validate repos

    // Create an OIDC Provider for GitHub Actions
    const githubOidcProvider = new iam.OpenIdConnectProvider(scope, 'github-oidc-provider', {
      url: 'https://vstoken.actions.githubusercontent.com',
      //clientIds: repos.map((repo) => { return `https://github.com/${repo}`; }),
      clientIds: ['sigstore'],
      thumbprints: ['a031c46782e6e6c662c2c87c76da9aa62ccabd8e'],
    });

    // Create an IAM role with policies provided.
    this.roleToAssume = new iam.Role(scope, 'iam-role-to-assume', {
      managedPolicies: props.managedPolicies,
      assumedBy: new iam.OpenIdConnectPrincipal(githubOidcProvider, {
        'ForAnyValue:StringEquals': {
          'vstoken.actions.githubusercontent.com:sub': repos.map((repo) => {
            return `repo:${repo}:*`;
          }),
        },
      }),
    });

    // Attach any other inline policies provided
    if (props.policies && props.policies.length >0 ) {
      props.policies.forEach((policy) => {
        this.roleToAssume.attachInlinePolicy(policy);
      });
    }
  }
}