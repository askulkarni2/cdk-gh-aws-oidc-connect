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


## Structs <a name="Structs"></a>

### GitHubActionsAwsOidcConnectProps <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { GitHubActionsAwsOidcConnectProps } from 'cdk-gh-aws-oidc-connect'

const gitHubActionsAwsOidcConnectProps: GitHubActionsAwsOidcConnectProps = { ... }
```

##### `repos`<sup>Required</sup> <a name="cdk-gh-aws-oidc-connect.GitHubActionsAwsOidcConnectProps.property.repos"></a>

```typescript
public readonly repos: string[];
```

- *Type:* `string`[]

List of GitHub repositories which will assume the IAM role.

E.g. ['aidansteele/aws-federation-github-actions']

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



