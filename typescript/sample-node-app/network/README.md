# Network

Sample CURL calls to test the network.

## Usage

Replace the `<isv-external-id>` for the generated endpoint subdomain of your own external AUNA API.

## Chaincodes

There are 2 availables chaincodes:
- test-go: Golang based smartcontract, with a simple Stock model
- test-node: Node.js based smartcontract, with a simple Customer/Account model

### test-go calls

Call the _ping_ query
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/stock/ping \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json'
```

Store a new stock or update an existing one:
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/stock/store \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "isin": "CLP7847L1080",
    "symbol": "COPEC",
    "description": "EMPRESAS COPEC S.A.",
    "price": "8238"
}'
```
The price must be a valid integer written as a string.

Search all stocks:
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/stock/find \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
  "args":[
    {
      "selector":{
      	"_id":{"$gt":null}
      }
    }
  ]
}'
```

Search a single stock:
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/stock/find \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
  "args":[
    {
      "selector":{
      	"Symbol":"COPEC"
      }
    }
  ]
}'
```

### test-node calls

Store a new customer account:
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/customer/store \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"args": {
		"rut": "1-9",
		"firstName": "John",
		"lastName": "Doe",
		"status": "ACTIVE",
		"accountType": "NORMAL",
		"amount": 1000
	}
}'
```

Add an extra amount to the previous account:
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/customer/add \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"args": {
		"rut": "1-9",
		"amount": 2000
	}
}'
```

Search all accounts:
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/customer/find \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
  "args":[
    {
      "selector":{
      	"_id":{"$gt":null}
      }
    }
  ]
}'
```

Search all accounts with ACTIVE status and NORMAL type:
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/customer/find \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
  "args":[
    {
      "selector":{
      	"status": "ACTIVE",
        "accountType": "NORMAL"
      }
    }
  ]
}'
```

Get the change history of an account:
```shell
curl -X POST \
  https://<isv-external-id>.aunablockchain.com/customer/history \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"args": "1-9"
}'
```