import * as iam from '@aws-cdk/aws-iam';
import { Construct, Duration } from '@aws-cdk/core';
import { GitHubActionsOidcProvider, IGitHubActionsOidcProvider } from './provider';

/**
 * Props for `GitHubActionsRole`.
 */
export interface GitHubActionsRoleProps {
  /**
   * The singleton instance of the GitHub OIDC provider deployed to this
   * account.
   *
   * You will need to separately provision a single instance of
   * `GitHubOidcProvider` to the account and then use
   * `GitHubOidcProvider.forAccount(this)` to retrieve a reference to this
   * provider.
   *
   * @example GitHubOidcProvider.forAccount(this)
   */
  readonly provider: IGitHubActionsOidcProvider;

  /**
   * The full name of the GitHub repository (e.g. `myaccount/myrepo`).
   */
  readonly repository: string;

  /**
   * List of IDs that the role assumer needs to provide one of when assuming this role.
   *
   * If the configured and provided external IDs do not match, the
   * AssumeRole operation will fail.
   *
   * @default No external ID required
   * @stability stable
   */
  readonly externalIds?: string[];
  /**
    * A list of managed policies associated with this role.
    *
    * You can add managed policies later using
    * `addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName))`.
    *
    * @default - No managed policies.
    * @stability stable
    */
  readonly managedPolicies?: iam.IManagedPolicy[];
  /**
    * A list of named policies to inline into this role.
    *
    * These policies will be
    * created with the role, whereas those added by ``addToPolicy`` are added
    * using a separate CloudFormation resource (allowing a way around circular
    * dependencies that could otherwise be introduced).
    *
    * @default - No policy is inlined in the Role resource.
    * @stability stable
    */
  readonly inlinePolicies?: {
    [name: string]: iam.PolicyDocument;
  };

  /**
    * The path associated with this role.
    *
    * For information about IAM paths, see
    * Friendly Names and Paths in IAM User Guide.
    *
    * @default /
    * @stability stable
    */
  readonly path?: string;

  /**
    * AWS supports permissions boundaries for IAM entities (users or roles).
    *
    * A permissions boundary is an advanced feature for using a managed policy
    * to set the maximum permissions that an identity-based policy can grant to
    * an IAM entity. An entity's permissions boundary allows it to perform only
    * the actions that are allowed by both its identity-based policies and its
    * permissions boundaries.
    *
    * @default - No permissions boundary.
    * @stability stable
    * @link https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html
    */
  readonly permissionsBoundary?: iam.IManagedPolicy;

  /**
    * A name for the IAM role.
    *
    * For valid values, see the RoleName parameter for
    * the CreateRole action in the IAM API Reference.
    *
    * IMPORTANT: If you specify a name, you cannot perform updates that require
    * replacement of this resource. You can perform updates that require no or
    * some interruption. If you must replace the resource, specify a new name.
    *
    * If you specify a name, you must specify the CAPABILITY_NAMED_IAM value to
    * acknowledge your template's capabilities. For more information, see
    * Acknowledging IAM Resources in AWS CloudFormation Templates.
    *
    * @default - AWS CloudFormation generates a unique physical ID and uses that ID
    * for the role name.
    * @stability stable
    */
  readonly roleName?: string;
  /**
    * The maximum session duration that you want to set for the specified role.
    *
    * This setting can have a value from 1 hour (3600sec) to 12 (43200sec) hours.
    *
    * Anyone who assumes the role from the AWS CLI or API can use the
    * DurationSeconds API parameter or the duration-seconds CLI parameter to
    * request a longer session. The MaxSessionDuration setting determines the
    * maximum duration that can be requested using the DurationSeconds
    * parameter.
    *
    * If users don't specify a value for the DurationSeconds parameter, their
    * security credentials are valid for one hour by default. This applies when
    * you use the AssumeRole* API operations or the assume-role* CLI operations
    * but does not apply when you use those operations to create a console URL.
    *
    * @default Duration.hours(1)
    * @stability stable
    * @link https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html
    */
  readonly maxSessionDuration?: Duration;

  /**
    * A description of the role.
    *
    * It can be up to 1000 characters long.
    *
    * @default - No description.
    * @stability stable
    */
  readonly description?: string;

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

/**
 * Creates an IAM role that can be assumed by GitHub workflows.
 *
 * Use the `aws-actions/configure-aws-credentials` GitHub action and specify
 * only `role-to-assume` in order to assume this role from a GitHub workflow.
 *
 * @see https://github.com/aws-actions/configure-aws-credentials#assuming-a-role
 */
export class GitHubActionsRole extends iam.Role {
  constructor(scope: Construct, id: string, props: GitHubActionsRoleProps) {
    const [org, repo] = props.repository.split('/');

    // the ARN of the provider is static since its based on the domain
    const providerArn = props.provider.providerArn;

    // grant only requests coming from a specific GitHub repository.
    const conditions: Record<string, string> = {};
    conditions[`${GitHubActionsOidcProvider.DOMAIN}:sub`] = `repo:${org}/${repo}:*`;

    if (props.requiredSessionName) {
      conditions['sts:RoleSessionName'] = props.requiredSessionName;
    }

    super(scope, id, {
      assumedBy: new iam.WebIdentityPrincipal(providerArn, { StringLike: conditions }),
      description: props.description,
      externalIds: props.externalIds,
      inlinePolicies: props.inlinePolicies,
      managedPolicies: props.managedPolicies,
      maxSessionDuration: props.maxSessionDuration,
      path: props.path,
      permissionsBoundary: props.permissionsBoundary,
      roleName: props.roleName,
    });
  }
}
