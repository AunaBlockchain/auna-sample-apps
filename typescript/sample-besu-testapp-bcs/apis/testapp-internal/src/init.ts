/*
 * Copyright (c) BOLSA DE COMERCIO DE SANTIAGO S.A. (Chile) All rights
 * reserved.
 * 
 * All rights to this product are owned by BOLSA DE COMERCIO DE
 * SANTIAGO S.A.
 * and may only be used under the terms of its associated license
 * document. You
 * may NOT copy, modify, sublincese, or distribute this source file or
 * portions
 * of it unless previously authorized in writing by BOLSA DE COMERCIO
 * DE
 * SANTIAGO S.A. In any event, this notice must always be included
 * verbatim with
 * this file.
 */

/**
 * @author Marco Alarcón
 * @description Init module for Ethereum cli
 */

import { readFileSync } from 'fs';
import Web3 from 'web3';

export let web3: Web3;

const path = '/usr/src/app/network/'; // Path where AUNA will place the required files to connect to the BESU network
const adm_file = path + 'admin.json';
const net_file = path + 'network.json';
const contractName = 'HelloWorldContract'; // Single smartcontract to load, called "HelloWorldContract"

export let vars = {
    account_from: {
        publicKey: '',
        privateKey: '',
    },
    besu_node: {
        url: ''
    },
    contractAbi: null as any,
    contractAddress: '',
    contractName: '',
};

export const initVars = async () => {
    let adm_data = '';
    let net_data = '';

    try {
        adm_data = readFileSync(adm_file, 'utf8');
    } catch (err) {
        console.error(err)
        console.log('ERROR:', 'Archivo admin.json inexistente.')
        process.exit(1)
    }

    try {
        net_data = readFileSync(net_file, 'utf-8');
    } catch (err) {
        console.error(err)
        console.log('ERROR:', 'Archivo network.json inexistente.')
        process.exit(2)
    }

    const adm_json = JSON.parse(adm_data);
    const net_json = JSON.parse(net_data);

    const contractData = net_json.data.find((itm: any) => {
        return itm.name == contractName;
    });

    let abi = contractData.abi;
    if (!Array.isArray(abi)) {
        abi = [abi];
    }
    for (const a of abi) {
        a.inputs = a.inputs || [];
        a.outputs = a.outputs || [];
        for (const o of a.outputs) {
            o.name = o.name || '';
        }
    }
    console.log(JSON.stringify(abi));

    vars.account_from.publicKey = adm_json.accounts[1].publicKey;
    vars.account_from.privateKey = adm_json.accounts[1].privateKey;
    vars.besu_node.url = adm_json.url;
    vars.contractAbi = abi;
    vars.contractAddress = contractData.address;
    vars.contractName = contractData.name;

    console.log('');

    console.log('public      : ', vars.account_from.publicKey);
    console.log('private     : ', vars.account_from.privateKey);
    console.log('besu-node   : ', vars.besu_node.url);
    console.log('caddress    : ', vars.contractAddress);
    console.log('contract    : ', vars.contractName);

    console.log('');

    web3 = new Web3(vars.besu_node.url);
}