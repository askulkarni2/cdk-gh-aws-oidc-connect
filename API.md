# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### GitHubActionsAwsOidcConnect <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnect"></a>

#### Initializers <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnect.Initializer"></a>

```typescript
import { GitHubActionsAwsOidcConnect } from 'cdk-gh-aws-oidc-connect'

new GitHubActionsAwsOidcConnect(scope: Construct, id: string, props: GitHubActionsAwsOidcConnectProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnect.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnect.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnect.parameter.props"></a>

- *Type:* [`cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps`](#cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps)

---



#### Properties <a name="Properties"></a>

##### `roleToAssume`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnect.property.roleToAssume"></a>

```typescript
public readonly roleToAssume: Role;
```

- *Type:* [`@aws-cdk/aws-iam.Role`](#@aws-cdk/aws-iam.Role)

This is the role GitHub Actions can assume for the repos provided.

---


### GitHubActionsOidcProvider <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider"></a>

- *Implements:* [`cdk-gh-aws-oidc-connect.IGitHubActionsOidcProvider`](#cdk-gh-aws-oidc-connect.IGitHubActionsOidcProvider)

Defines an OIDC provider for GitHub workflows.

Please note that only a single instance of this provider can be installed in
an AWS account.

#### Initializers <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.Initializer"></a>

```typescript
import { GitHubActionsOidcProvider } from 'cdk-gh-aws-oidc-connect'

new GitHubActionsOidcProvider(scope: Construct, id: string, props?: GitHubActionsOidcProviderProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.parameter.props"></a>

- *Type:* [`cdk-gh-aws-oidc-connect.GitHubActionsOidcProviderProps`](#cdk-gh-aws-oidc-connect.GitHubActionsOidcProviderProps)

---


#### Static Functions <a name="Static Functions"></a>

##### `forAccount` <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.forAccount"></a>

```typescript
import { GitHubActionsOidcProvider } from 'cdk-gh-aws-oidc-connect'

GitHubActionsOidcProvider.forAccount(account?: string)
```

###### `account`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.parameter.account"></a>

- *Type:* `string`

The AWS account for which you want to obtain the OIDC provider.

If not specified, we will use the current account.

---

#### Properties <a name="Properties"></a>

##### `providerArn`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.property.providerArn"></a>

```typescript
public readonly providerArn: string;
```

- *Type:* `string`

The ARN of the OIDC provider.

---

#### Constants <a name="Constants"></a>

##### `DOMAIN` <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.property.DOMAIN"></a>

- *Type:* `string`

The OIDC domain for GitHub.

---

##### `THUMBPRINT` <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider.property.THUMBPRINT"></a>

- *Type:* `string`

The OIDC domain thumbprint for GitHub.

---

### GitHubActionsRole <a name="cdk-gh-aws-oidc-connect.GitHubActionsRole"></a>

Creates an IAM role that can be assumed by GitHub workflows.

Use the `aws-actions/configure-aws-credentials` GitHub action and specify
only `role-to-assume` in order to assume this role from a GitHub workflow.

> https://github.com/aws-actions/configure-aws-credentials#assuming-a-role

#### Initializers <a name="cdk-gh-aws-oidc-connect.GitHubActionsRole.Initializer"></a>

```typescript
import { GitHubActionsRole } from 'cdk-gh-aws-oidc-connect'

new GitHubActionsRole(scope: Construct, id: string, props: GitHubActionsRoleProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRole.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRole.parameter.props"></a>

- *Type:* [`cdk-gh-aws-oidc-connect.GitHubActionsRoleProps`](#cdk-gh-aws-oidc-connect.GitHubActionsRoleProps)

---





## Structs <a name="Structs"></a>

### GitHubActionsAwsOidcConnectProps <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { GitHubActionsAwsOidcConnectProps } from 'cdk-gh-aws-oidc-connect'

const gitHubActionsAwsOidcConnectProps: GitHubActionsAwsOidcConnectProps = { ... }
```

##### `repo`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* `string`

GitHub repository which will assume the IAM role.

E.g. aidansteele/aws-federation-github-actions

---

##### `externalIds`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps.property.externalIds"></a>

```typescript
public readonly externalIds: string[];
```

- *Type:* `string`[]
- *Default:* not limited to specific external IDs.

External IDs required in order to assume the role.

---

##### `managedPolicies`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps.property.managedPolicies"></a>

```typescript
public readonly managedPolicies: IManagedPolicy[];
```

- *Type:* [`@aws-cdk/aws-iam.IManagedPolicy`](#@aws-cdk/aws-iam.IManagedPolicy)[]

A list of Managed IAM policies.

---

##### `policies`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps.property.policies"></a>

```typescript
public readonly policies: Policy[];
```

- *Type:* [`@aws-cdk/aws-iam.Policy`](#@aws-cdk/aws-iam.Policy)[]

A list of IAM policies.

---

##### `roleName`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* `string`
- *Default:* generated

The name of the IAM role to create.

---

### GitHubActionsOidcProviderProps <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProviderProps"></a>

Props for `GitHubActionsOidcProvider`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { GitHubActionsOidcProviderProps } from 'cdk-gh-aws-oidc-connect'

const gitHubActionsOidcProviderProps: GitHubActionsOidcProviderProps = { ... }
```

##### `clientIdList`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsOidcProviderProps.property.clientIdList"></a>

```typescript
public readonly clientIdList: string[];
```

- *Type:* `string`[]
- *Default:* ['sigstore']

The client ID of the GitHub OIDC provider.

---

### GitHubActionsRoleProps <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps"></a>

Props for `GitHubActionsRole`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { GitHubActionsRoleProps } from 'cdk-gh-aws-oidc-connect'

const gitHubActionsRoleProps: GitHubActionsRoleProps = { ... }
```

##### `provider`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.provider"></a>

```typescript
public readonly provider: IGitHubActionsOidcProvider;
```

- *Type:* [`cdk-gh-aws-oidc-connect.IGitHubActionsOidcProvider`](#cdk-gh-aws-oidc-connect.IGitHubActionsOidcProvider)

The singleton instance of the GitHub OIDC provider deployed to this account.

You will need to separately provision a single instance of
`GitHubOidcProvider` to the account and then use
`GitHubOidcProvider.forAccount(this)` to retrieve a reference to this
provider.

---

##### `repository`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* `string`

The full name of the GitHub repository (e.g. `myaccount/myrepo`).

---

##### `description`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`
- *Default:* No description.

A description of the role.

It can be up to 1000 characters long.

---

##### `externalIds`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.externalIds"></a>

```typescript
public readonly externalIds: string[];
```

- *Type:* `string`[]
- *Default:* No external ID required

List of IDs that the role assumer needs to provide one of when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

---

##### `inlinePolicies`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.inlinePolicies"></a>

```typescript
public readonly inlinePolicies: {[ key: string ]: PolicyDocument};
```

- *Type:* {[ key: string ]: [`@aws-cdk/aws-iam.PolicyDocument`](#@aws-cdk/aws-iam.PolicyDocument)}
- *Default:* No policy is inlined in the Role resource.

A list of named policies to inline into this role.

These policies will be
created with the role, whereas those added by ``addToPolicy`` are added
using a separate CloudFormation resource (allowing a way around circular
dependencies that could otherwise be introduced).

---

##### `managedPolicies`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.managedPolicies"></a>

```typescript
public readonly managedPolicies: IManagedPolicy[];
```

- *Type:* [`@aws-cdk/aws-iam.IManagedPolicy`](#@aws-cdk/aws-iam.IManagedPolicy)[]
- *Default:* No managed policies.

A list of managed policies associated with this role.

You can add managed policies later using
`addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName))`.

---

##### `maxSessionDuration`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.maxSessionDuration"></a>

```typescript
public readonly maxSessionDuration: Duration;
```

- *Type:* [`@aws-cdk/core.Duration`](#@aws-cdk/core.Duration)
- *Default:* Duration.hours(1)

The maximum session duration that you want to set for the specified role.

This setting can have a value from 1 hour (3600sec) to 12 (43200sec) hours.

Anyone who assumes the role from the AWS CLI or API can use the
DurationSeconds API parameter or the duration-seconds CLI parameter to
request a longer session. The MaxSessionDuration setting determines the
maximum duration that can be requested using the DurationSeconds
parameter.

If users don't specify a value for the DurationSeconds parameter, their
security credentials are valid for one hour by default. This applies when
you use the AssumeRole* API operations or the assume-role* CLI operations
but does not apply when you use those operations to create a console URL.

> [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html)

---

##### `path`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* `string`
- *Default:* /

The path associated with this role.

For information about IAM paths, see
Friendly Names and Paths in IAM User Guide.

---

##### `permissionsBoundary`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: IManagedPolicy;
```

- *Type:* [`@aws-cdk/aws-iam.IManagedPolicy`](#@aws-cdk/aws-iam.IManagedPolicy)
- *Default:* No permissions boundary.

AWS supports permissions boundaries for IAM entities (users or roles).

A permissions boundary is an advanced feature for using a managed policy
to set the maximum permissions that an identity-based policy can grant to
an IAM entity. An entity's permissions boundary allows it to perform only
the actions that are allowed by both its identity-based policies and its
permissions boundaries.

> [https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)

---

##### `roleName`<sup>Optional</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsRoleProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* `string`
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID
for the role name.

A name for the IAM role.

For valid values, see the RoleName parameter for
the CreateRole action in the IAM API Reference.

IMPORTANT: If you specify a name, you cannot perform updates that require
replacement of this resource. You can perform updates that require no or
some interruption. If you must replace the resource, specify a new name.

If you specify a name, you must specify the CAPABILITY_NAMED_IAM value to
acknowledge your template's capabilities. For more information, see
Acknowledging IAM Resources in AWS CloudFormation Templates.

---


## Protocols <a name="Protocols"></a>

### IGitHubActionsOidcProvider <a name="cdk-gh-aws-oidc-connect.IGitHubActionsOidcProvider"></a>

- *Implemented By:* [`cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider`](#cdk-gh-aws-oidc-connect.GitHubActionsOidcProvider), [`cdk-gh-aws-oidc-connect.IGitHubActionsOidcProvider`](#cdk-gh-aws-oidc-connect.IGitHubActionsOidcProvider)

Represents a GitHub OIDC provider.


#### Properties <a name="Properties"></a>

##### `providerArn`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.IGitHubActionsOidcProvider.property.providerArn"></a>

```typescript
public readonly providerArn: string;
```

- *Type:* `string`

The ARN of the OIDC provider.

---

