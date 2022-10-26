# Network

Sample CURL calls to test the network.

## Usage

Replace the `<isv-external-id>` for the generated endpoint subdomain of your own external AUNA API.

## Smartcontract

There is 1 availables smartcontract:
- ERC20Basic: a Solidity based smartcontract which implements a basic ERC20 token

### Smartcontract calls

Get total amount of minted tokens
```shell
curl --location --request GET 'http://<isv-external-id>.aunablockchain.com:80/api/totalSupply'
```

Get balance of a given account
```shell
curl --location --request GET 'http://<isv-external-id>.aunablockchain.com:80/api/balanceOf' \
--header 'Content-Type: application/json' \
--data-raw '{
    "tokenOwner": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
}'
```

Get the amount of tokens that a delegate account is allowed to operate with
```shell
curl --location --request GET 'http://<isv-external-id>.aunablockchain.com:80/api/allowance' \
--header 'Content-Type: application/json' \
--data-raw '{
    "owner": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    "delegate": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
}'
```

Transfer tokens from the owner account
```shell
curl --location --request POST 'http://<isv-external-id>.aunablockchain.com:80/api/transfer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "receiver": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
    "numTokens": "88"
}'
```

Authorize to a delegate account a certain amount of tokens that can be managed by
```shell
curl --location --request POST 'http://<isv-external-id>.aunablockchain.com:80/api/approve' \
--header 'Content-Type: application/json' \
--data-raw '{
    "delegate": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    "numTokens": "1000000"
}'
```

Transfer tokens from one account (delegate) to another
```shell
curl --location --request POST 'http://<isv-external-id>.aunablockchain.com:80/api/transferFrom' \
--header 'Content-Type: application/json' \
--data-raw '{
    "owner": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    "buyer": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
    "numTokens": "99"
}'
```
