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
 * @description Sample Internal API model
 */

import { utils } from '@bcs/baas-common';
import { FabricApiClient } from '@bcs/baas-hlf-client-cli';

const logger = utils.getLogger('internal-api-sample-model');
const client = new FabricApiClient({
	clientConfig: '/usr/src/app/network/network.yaml',
	user: '/usr/src/app/network/admin.yaml'
});

/**
 * Exported Model Functions
 */

export const initModel = async () => {
	const result = await client.login();
	return result.success;
}

export const echo = async (msg: string) => {
	logger.info('Echo message: %s', msg);
	return msg;
}

export const callInit = async () => {
	logger.info('Calling test-go.init()');
	const result = await client.invokeSmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-go',
		functionName: 'init',
		waitForBlock: true
	});
	return result;
}

export const callFind = async (args: any) => {
	logger.info('Calling test-go.find()');
	logger.info('Args: %s', args);
	const result = await client.querySmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-go',
		functionName: 'init',
		args: args,
		queryAllPeers: false
	});
	return result;
}