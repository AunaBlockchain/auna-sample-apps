import { readFileSync } from 'fs'
var Web3 = require('web3')

export var web3

const path         = '/usr/src/app/network/'
const adm_file     = path + 'admin.json'
const net_file     = path + 'network.json'
const contractName = 'ERC20Basic'

var contractData
export var vars = {
    account_from : {
        publicKey  : "",
        privateKey : "",
    },
    besu_node : {
        url        : ""
    },
    contractAbi    : "",
    contractAccount: "",
    contractAddress: "",
    contractName   : "",
};

export const initVars = async () => {
    console.log('Admin   file: ', adm_file)
    console.log('Network file: ', net_file)

    let adm_data = ''
    let net_data = ''

    try {
        adm_data = readFileSync(adm_file, 'utf8')
    } catch (err) {
        console.error(err)
        console.log('ERROR:', 'Archivo admin.json inexistente.')
        process.exit(1)
    }

    try {
        net_data = readFileSync(net_file)
    } catch (err) {
        console.error(err)
        console.log('ERROR:', 'Archivo network.json inexistente.')
        process.exit(2)
    }

    let adm_json = JSON.parse(adm_data)
    let net_json = JSON.parse(net_data)

    contractData  = Object.values(net_json.data).filter(function(item) {
        return item.name == contractName
    });
    console.log('contractData:', contractData)

    vars.account_from.publicKey  = adm_json.accounts[0].publicKey
    vars.account_from.privateKey = adm_json.accounts[0].privateKey
    vars.besu_node.url           = adm_json.url
    vars.contractAbi             = contractData[0].abi
    vars.contractAccount         = contractData[0].account
    vars.contractAddress         = contractData[0].address
    vars.contractName            = contractData[0].name

    console.log('')

    console.log('public     : ', vars.account_from.publicKey)
    console.log('private    : ', vars.account_from.privateKey)
    console.log('besu-node  : ', vars.besu_node.url)
    console.log('account    : ', vars.contractAccount)
    console.log('address    : ', vars.contractAddress)
    console.log('name       : ', vars.contractName)
 
    console.log('')

    web3 = new Web3(vars.besu_node.url);
}
