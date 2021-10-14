import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import { GitHubActionsOidcProvider } from './provider';
import { GitHubActionsRole } from './role';

export * from './provider';
export * from './role';

export interface GitHubActionsAwsOidcConnectProps {
  /**
   * GitHub repository which will assume the IAM role.
   * E.g. aidansteele/aws-federation-github-actions
   */
  readonly repo: string;

  /**
   * The name of the IAM role to create.
   *
   * @default - generated
   */
  readonly roleName?: string;

  /**
   * A list of IAM policies.
   */
  readonly policies?: Array<iam.Policy>;

  /**
   * A list of Managed IAM policies.
   */
  readonly managedPolicies?: Array<iam.IManagedPolicy>;

  /**
   * Only allows sessions with this name to assume the role.
   *
   * This can be used to e.g. restrict that only certain GitHub workflows will be able to assume the role
   * by setting `
   *
   * @default - allow all sessions to assume this role.
   */
  readonly requiredSessionName?: string;
}

export class GitHubActionsAwsOidcConnect extends cdk.Construct {
  /**
   * This is the role GitHub Actions can assume for the repos provided.
   */
  public roleToAssume: iam.Role;

  constructor(scope: cdk.Construct, id: string, props: GitHubActionsAwsOidcConnectProps) {
    super(scope, id);

    const provider = new GitHubActionsOidcProvider(this, 'Provider');

    this.roleToAssume = new GitHubActionsRole(this, 'iam-role-to-assume', {
      provider: provider,
      managedPolicies: props.managedPolicies,
      repository: props.repo,
      requiredSessionName: props.requiredSessionName,
      roleName: props.roleName,
    });

    // Attach any other inline policies provided
    if (props.policies && props.policies.length >0 ) {
      props.policies.forEach((policy) => {
        this.roleToAssume.attachInlinePolicy(policy);
      });
    }
  }
}