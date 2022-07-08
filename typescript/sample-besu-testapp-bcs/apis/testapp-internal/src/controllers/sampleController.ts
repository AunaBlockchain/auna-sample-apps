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
 * @modifiedBy Hugo A. Bustamante
 * @description Sample Router controller
 */

import { Request, Response } from 'express';
import * as sm from '../models/sampleModelNodeSM';

export const echo = (req: Request, res: Response) => {
	const msg = req.body.message;
	return res.json({ message: msg });
}

export const getName = async (req: Request, res: Response) => {
	const result = await sm.getFromContract("getName");
	return res.json(result);
}

export const getAge = async (req: Request, res: Response) => {
	const result = await sm.getFromContract("getAge");
	return res.json(result);
}

export const setName = async (req: Request, res: Response) => {
	console.log(req.body);
	const name = req.body.name;
	if (!name) {
		throw new Error('invalid parameters');
	}
	const result = await sm.putToContract("setName", name);
	return res.json(result);
}

export const setAge = async (req: Request, res: Response) => {
	console.log(req.body);
	const age = req.body.age;
	if (!age || age <= 0) {
		throw new Error('invalid parameters');
	}
	const result = await sm.putToContract("setAge", age);
	return res.json(result);
}