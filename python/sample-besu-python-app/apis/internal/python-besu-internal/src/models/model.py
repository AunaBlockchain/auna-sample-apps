from web3 import Web3, HTTPProvider
import json
import yaml


with open("./config/config.yaml", "r") as yamlfile:
   config = yaml.load(yamlfile, Loader=yaml.FullLoader)
  
file_admin = open('/usr/src/app/network/admin.json')
data_admin = json.load(file_admin)
file_admin.close()

file_network = open('/usr/src/app/network/network.json')
data_network = json.load(file_network)
file_network.close()

contract_abi                = data_network['data'][0]['abi']
contract_address            = data_network['data'][0]['address']

network_url                = data_admin['url']
network_account            = Web3.toChecksumAddress(data_admin['accounts'][0]['publicKey'])
network_account_privateKey = data_admin['accounts'][0]['privateKey']

gas = 100000

w3 = Web3(HTTPProvider(network_url))

contract = w3.eth.contract(contract_address, abi=contract_abi)