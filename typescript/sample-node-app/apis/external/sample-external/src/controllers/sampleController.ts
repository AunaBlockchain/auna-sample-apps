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

import { utils } from '@auna/auna-common';
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

/**
 * Reverse proxy forward any request to the internal API
 */
export const forward = async(req: Request, res: Response, model: string, method: string) => {
	logger.info('Calling internal %s API %s()', model, method);
	const response = await axios.post(`${commons.config.apiInternalUrl}/${model}/${method}`, req.body);

	const b = Buffer.from(response.data.output)
	let out = {"success": response.data.success,"message": response.data.message,"output": b.toString(),"transactionId": response.data.transactionId}
	return res.json(out);
}