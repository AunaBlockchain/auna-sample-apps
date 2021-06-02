# Sample Node App

## Description

Sample application done mainly with Typescript. It includes:
- A simple Golang-based Smartcontract with basic CRUD operations
- A simple Node.js-based Smartcontract with basic CRUD operations and history retrieval
- An Internal Node.js Typescript API that connects to the Fabric network to operate with the smartcontract
- An External Node.js Typescript API that expose the business functionality to be consumed

## Instructions

Edit the `project.yaml` file for the attribute __network__. Change the "org" ID (Organization ID) for your own value.

Edit the `project.yaml` file for the attribute __smartcontracts[].endorsement__:
```yaml
smartcontracts:
- id: test-go
  endorsement: '{"identities":[{"role":{"name":"member","mspId":"bcsMSP"}}],"policy":{"signed-by":0}}'
```
Change the value of "mspId" for your own Organization ID MSP.

Before uploading the sample application, do:
```shell
cd smartcontracts/test-go
go mod vendor
```

If you still don't have installed the AUNA Packer, do:
```shell
npm i -g @bcs/auna-packer --@bcs:registry=https://npm.aunablockchain.com
```

Then, create the application package with:
```shell
cd ..
cd ..
packer compress -p .
```

Finally, upload the application package to the AUNA ISV Portal

## Local test APIs

Check that the source code for the APIs is syntactically valid as Typescript.

For the external API, use the following commands:
```shell
cd apis/external/sample-external
# Install NPM modules with dev dependencies
npm install --save-dev
# Build the Node.js code from Typescript
npm run build
# Run the API
node .
```

It will be running forever, until you kill the process with CTRL+C.

For the internal API, use the following commands:
```shell
cd apis/internal/sample-internal
# Install NPM modules with dev dependencies
npm install --save-dev
# Build the Node.js code from Typescript
npm run build
# Run the API
node .
```

The internal API will crash in the initialization stage, since it requires a valid Fabric connection profile archive and a valid user file.

## Local test Chaincodes

Check that the source code for the APIs is syntactically and semantically valid as Golang.

For the `test-go` chaincode, use the following commands:
```shell
cd smartcontracts/test-go
go build
```

An executable file called `test-go` will be created if the code has no compile errors.

For the `test-node` chaincode, use the following commands:
```shell
cd smartcontracts/test-node
npm install
npm run start
```

The Node.js smartcontract will try to connect to it's peer node and will fail immediately. Any other error indicates a sintaxis error in the code.

## Next steps

Check the README.md file in the `network` folder