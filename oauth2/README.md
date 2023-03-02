# AUNA SDK Single SignOn examples

AUNA OAuth2 integration examples. This sample explains how to call the generated OIDC provider for each DApp deployed in the AUNA ecosystem.

## Samples

There are 2 sampples:
- Go with the official OAuth2 package to generate access/refresh tokens and with GoResty as a REST client
- Node with client-oauth2 to generate access/refresh tokens and with Axios as a REST client

## How to use

### Go
Execute:
```shell
go mod download
go run main.go <clientId> <username> <password>
```

Where:
- __clientId__: auna-cli-&lt;ISV ID>-public (example: `auna-cli-90249000-0-public`)
- __username__: ISV username for the Dev Portal or a robot account created in the Dev Portal
- __password__: User password

### Node
Execute:
```shell
npm install
node index.js <clientId> <username> <password>
```

Where:
- __clientId__: auna-cli-&lt;ISV ID>-public (example: `auna-cli-90249000-0-public`)
- __username__: ISV username for the Dev Portal or a robot account created in the Dev Portal
- __password__: User password
