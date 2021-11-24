import * as iam from '@aws-cdk/aws-iam';
import { Aws, Construct } from '@aws-cdk/core';

/**
 * Represents a GitHub OIDC provider.
 */
export interface IGitHubActionsOidcProvider {
  /**
   * The ARN of the OIDC provider.
   */
  readonly providerArn: string;
}

/**
 * Props for `GitHubActionsOidcProvider`.
 */
export interface GitHubActionsOidcProviderProps {
  /**
   * The client ID of the GitHub OIDC provider.
   *
   * @default - ['sigstore']
   * @stability stable
   */
  readonly clientIdList?: string[];
}

/**
 * Defines an OIDC provider for GitHub workflows.
 *
 * Please note that only a single instance of this provider can be installed in
 * an AWS account.
 */
export class GitHubActionsOidcProvider extends Construct implements IGitHubActionsOidcProvider {
  /**
   * The OIDC domain for GitHub.
   */
  public static readonly DOMAIN = 'token.actions.githubusercontent.com';

  /**
   * The OIDC domain thumbprint for GitHub.
   */
  public static readonly THUMBPRINT = 'a031c46782e6e6c662c2c87c76da9aa62ccabd8e';

  /**
   * @param account The AWS account for which you want to obtain the OIDC
   * provider. If not specified, we will use the current account.
   *
   * @returns The singleton GitHub OIDC provider for an account.
   */
  public static forAccount(account?: string): IGitHubActionsOidcProvider {
    return {
      providerArn: arnForAccount(account),
    };
  }

  /**
   * The ARN of the OIDC provider.
   */
  public readonly providerArn: string;

  constructor(scope: Construct, id: string, props?: GitHubActionsOidcProviderProps) {
    super(scope, id);

    const provider = new iam.CfnOIDCProvider(scope, `${id}.GithubOidcProvider`, {
      url: `https://${GitHubActionsOidcProvider.DOMAIN}`,
      thumbprintList: [GitHubActionsOidcProvider.THUMBPRINT],
      clientIdList: props?.clientIdList || ['sigstore'],
    });

    this.providerArn = provider.attrArn;
  }
}

function arnForAccount(account?: string): string {
  account = account ?? Aws.ACCOUNT_ID;
  return `arn:aws:iam::${account}:oidc-provider/${GitHubActionsOidcProvider.DOMAIN}`;
}