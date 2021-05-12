# Sample Node App

## Description

Sample application done with Typescript. It includes:
- A simple Golang-based Smartcontract with basic CRUD operations
- An Internal Node.js API that connects to the Fabric network to operate with the smartcontract
- An External Node.js API that expose the business functionality to be consumed

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

## Next steps

Check the README.md file in the `network` folder