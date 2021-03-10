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

import { Request, Response } from 'express';
import * as model from '../models/sampleModel';

export const echo = async (req: Request, res: Response) => {
	const msg = await model.echo(req.body.message);
	return res.json({ message: msg });
}

export const init = async (req: Request, res: Response) => {
	const result = await model.callInit();
	return res.json(result);
}

export const ping = async (req: Request, res: Response) => {
	const result = await model.callPing();
	return res.json(result);
}

export const find = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await model.callFind(args);
	return res.json(result);
}

export const store = async (req: Request, res: Response) => {
	const isin: string = req.body.isin;
	const symbol: string = req.body.symbol;
	const description: string = req.body.description;
	const price: Number = req.body.price;
	const result = await model.callStore(isin, symbol, description, price);
	return res.json(result);
}