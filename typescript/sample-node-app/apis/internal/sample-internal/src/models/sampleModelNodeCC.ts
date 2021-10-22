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
import { MailApiClient } from '@auna/auna-mailer-cli';
import * as commons from './commons';

const logger = utils.getLogger('internal-api-sample-model-nodecc');

// AUNA SDK Fabric Client connector
const client = new FabricApiClient({
	clientConfig: '/usr/src/app/network/network.json', // injected
	user: '/usr/src/app/network/admin.json', // injected
	endpointAddr: 'auna-hlf-client-service:3002' // fixed value
});

// AUNA SDK Mailer Connector
const mailer = new MailApiClient({
	endpointAddr: 'auna-mailer-service.auna-sdk-service:3000'
})

/**
 * Exported Model Functions
 */

export const init = async () => {
	logger.info('Calling test-node.init()');
	const result = await client.invokeSmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-node',
		functionName: 'Init',
		waitForBlock: true
	});
	return result;
}

export const ping = async () => {
	logger.info('Calling test-node.ping()');
	const result = await client.querySmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-node',
		functionName: 'ping',
		args: '',
		queryAllPeers: false
	});
	return result;
}

export const queryCustomers = async (args: any) => {
	logger.info('Calling test-node.queryCustomers()');
	logger.info('Args: %s', args);
	const result = await client.querySmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-node',
		functionName: 'queryCustomers',
		args: args,
		queryAllPeers: false
	});
	return result;
}

export const queryCustomersJ = async (args: any) => {
	// Sample result conversion
	const result = await queryCustomers(args);
	return commons.chaincodeResultToJSON(result);
}

export const queryAllCustomers = async (args: any) => {
	logger.info('Calling test-node.queryAllCustomers()');
	logger.info('Args: %s', args);
	const result = await client.querySmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-node',
		functionName: 'queryAllCustomers',
		args: '',
		queryAllPeers: false
	});
	return result;
}

export const queryAllCustomersJ = async (args: any) => {
	// Sample result conversion
	const result = await queryAllCustomers(args);
	return commons.chaincodeResultToJSON(result);
}

export const queryCustomerHistory = async (args: any) => {
	logger.info('Calling test-node.queryCustomerHistory()');
	logger.info('Args: %s', args);
	const result = await client.querySmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-node',
		functionName: 'queryCustomerHistory',
		args: args,
		queryAllPeers: false
	});
	return result;
}

export const createCustomer = async (args: any) => {
	logger.info('Calling test-node.createCustomer()');

	const result = await client.invokeSmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-node',
		functionName: 'createCustomer',
		args: args,
		waitForBlock: true
	});
	return result;
}

export const addCustomerFunds = async (args: any) => {
	logger.info('Calling test-node.addCustomerFunds()');

	const result = await client.invokeSmartContract({
		channelName: 'my-channel',
		chaincodeName: 'test-node',
		functionName: 'addCustomerFunds',
		args: args,
		waitForBlock: true
	});
	return result;
}

/**
 * Logic combination example. Calls the queryCustomerHistory method, then sends the results as an email
 */
export const sendHistoryByMail = async (rut: string, email: string) => {
	if (!rut || !email) {
		throw new Error('Invalid arguments');
	}
	logger.info('Retrieving historic info for %s', rut);
	const result = await queryCustomerHistory([rut]);

	logger.info('Sending email to %s', email);
	const m = await mailer.sendMail({
		from: 'test@aunablockchain.com',		// "from" email address (can be any address, is only for display)
		replyTo: 'soporte@aunablockchain.com',	// "reply to" email address (should be a valid address)
		subject: 'Cartola histórica ' + rut,	// "subject" to display
		to: email,								// "to" email address (should be a valid address)
		messageText: result.output?.toString(),	// plaintext body
		messageHtml: result.output?.toString()	// optional HTML body
	});

	logger.info('Email sent: ', m);
	return m;
}