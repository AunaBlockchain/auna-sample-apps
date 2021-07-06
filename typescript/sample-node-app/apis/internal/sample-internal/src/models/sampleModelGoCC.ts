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
 * @description Sample Internal API model, test-go chaincode calls
 */

import { utils } from '@bcs/baas-common';
import { FabricApiClient } from '@bcs/baas-hlf-client-cli';
import * as commons from './commons';

// AUNA SDK logger, if you don't have one use this
const logger = utils.getLogger('internal-api-sample-model-gocc');
// Initializing AUNA SDK Fabric client
const client = new FabricApiClient({
	clientConfig: '/usr/src/app/network/network.json',
	user: '/usr/src/app/network/admin.json',
	endpointAddr: 'auna-hlf-client-service:3002'
});

/**
 * Exported Model Functions
 */

export const echo = async (msg: string) => {
	logger.info('Echo message: %s', msg);
	return msg;
}

/**
 * Invokes transaction init()
 */
export const init = async () => {
	logger.info('Calling test-go.init()');
	const result = await client.invokeSmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-go',
		functionName: 'init',
		waitForBlock: true
	});
	return result;
}

/**
 * Calls ping() in query mode
 */
export const ping = async () => {
	logger.info('Calling test-go.ping()');
	const result = await client.querySmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-go',
		functionName: 'ping',
		args: '',
		queryAllPeers: false
	});
	return result;
}

/**
 * Calls find() in query mode
 * @param args a valid CouchDB selector object
 */
export const find = async (args: any) => {
	logger.info('Calling test-go.find()');
	logger.info('Args: %s', args);
	const result = await client.querySmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-go',
		functionName: 'find',
		args: args,
		queryAllPeers: false
	});
	return result;
}

/**
 * Calls find() in query mode, return result as JSON
 * @param args a valid CouchDB selector object
 */
export const findJ = async (args: any) => {
	// Sample result conversion
	const result = await find(args);
	return commons.chaincodeResultToJSON(result);
}

/**
 * Invokes transaction store()
 * @param isin ISIN code
 * @param symbol Stock symbol
 * @param description 
 * @param price 
 */
export const store = async (isin: string, symbol: string, description: string, price: string) => {
	logger.info('Calling test-go.store()');

	const args = {
		ISIN: isin,
		Symbol: symbol,
		Description: description,
		Price: price
	};

	logger.info('Storing:', args);

	const result = await client.invokeSmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-go',
		functionName: 'store',
		args: args,
		waitForBlock: true
	});
	return result;
}