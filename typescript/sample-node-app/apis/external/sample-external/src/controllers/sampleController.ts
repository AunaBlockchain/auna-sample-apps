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

import axios from 'axios';
import { Request, Response } from 'express';
import * as commons from '../models/commons';

export const echo = async (req: Request, res: Response) => {
	return res.json({ message: req.body.message });
}

export const echoInternal = async (req: Request, res: Response) => {
	console.log('Calling internal API');
	const response = await axios.post(commons.config.apiInternalUrl + '/echo', { message: req.body.message });
	return res.json(response);
}

export const init = async (req: Request, res: Response) => {
	console.log('Calling internal API init()');
	const response = await axios.post(commons.config.apiInternalUrl + '/init');
	return res.json(response);
}

export const find = async (req: Request, res: Response) => {
	console.log('Calling internal API find()');
	const response = await axios.post(commons.config.apiInternalUrl + '/find', { args: req.body.args });
	return res.json(response);
}

export const store = async (req: Request, res: Response) => {
	console.log('Calling internal API store()');
	const args = {
		isin: req.body.isin,
		symbol: req.body.symbol,
		description: req.body.description,
		price: req.body.price
	}

	const response = await axios.post(commons.config.apiInternalUrl + '/store', args);
	return res.json(response);
}