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
 * @description Sample Router controller
 */

import { utils } from '@bcs/baas-common';
import axios from 'axios';
import { Request, Response } from 'express';
import * as commons from '../models/commons';

const logger = utils.getLogger('sample-external-api-controller');

export const echo = async (req: Request, res: Response) => {
	return res.json({ message: req.body.message });
}

export const echoInternal = async (req: Request, res: Response) => {
	logger.info('Calling internal API');
	const response = await axios.post(commons.config.apiInternalUrl + '/echo', { message: req.body.message });
	return res.json(response.data);
}

export const totalSupply = async (req: Request, res: Response) => {
	logger.info('Calling internal API ... totalSupply');
	const response = await axios.get(commons.config.apiInternalUrl + '/api/totalSupply');
	return res.json(response.data);
}

export const balanceOf = async (req: Request, res: Response) => {
	logger.info('Calling internal API ... balanceOf');
	console.log('controller> body  : ', req.body);
	console.log('controller> params: ', req.params);
	console.log('controller> query : ', req.query);
	const _tokenOwner: string = req.body.tokenOwner;
	const response = await axios.get(commons.config.apiInternalUrl + '/api/balanceOf', { params: { tokenOwner: _tokenOwner } });
	return res.json(response.data);
}

export const allowance = async (req: Request, res: Response) => {
	logger.info('Calling internal API ... allowance');
	const _owner: string = req.body.owner;
	const _delegate: string = req.body.delegate;
	const response = await axios.get(commons.config.apiInternalUrl + '/api/allowance', { params: { owner: _owner, delegate: _delegate } });
	return res.json(response.data);
}

export const transfer = async (req: Request, res: Response) => {
	logger.info('Calling internal API ... transfer');
	const _receiver: string = req.body.receiver;
	const _numTokens: string = req.body.numTokens;
	const response = await axios.post(commons.config.apiInternalUrl + '/api/transfer', { receiver: _receiver, numTokens: _numTokens });
	return res.json(response.data);
}

export const approve = async (req: Request, res: Response) => {
	logger.info('Calling internal API ... approve');
	const _delegate: string = req.body.delegate;
	const _numTokens: string = req.body.numTokens;
	const response = await axios.post(commons.config.apiInternalUrl + '/api/approve', { delegate: _delegate, numTokens: _numTokens });
	return res.json(response.data);
}

export const transferFrom = async (req: Request, res: Response) => {
	logger.info('Calling internal API ... transferFrom');
	const _owner: string = req.body.owner;
	const _buyer: string = req.body.buyer;
	const _numTokens: string = req.body.numTokens;
	const response = await axios.post(commons.config.apiInternalUrl + '/api/transferFrom', { owner: _owner, buyer: _buyer, numTokens: _numTokens });
	return res.json(response.data);
}

/**
 * Reverse proxy forward any request to the internal API
 */
export const forward = async(req: Request, res: Response, model: string, method: string) => {
	logger.info('Calling internal %s API %s()', model, method);
	const response = await axios.post(`${commons.config.apiInternalUrl}/${model}/${method}`, req.body);
	return res.json(response.data);
}