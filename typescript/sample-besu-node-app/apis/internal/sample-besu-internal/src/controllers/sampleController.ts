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

export const totalSupply = async (req: Request, res: Response) => {
	console.log(req.body);
	const result = await sm.getFromContract("totalSupply", "", "");
	return res.json(result);
}

export const balanceOf = async (req: Request, res: Response) => {
	console.log('controller> body  : ', req.body);
	console.log('controller> params: ', req.params);
	console.log('controller> query : ', req.query);
	console.log('controller> tocOwn: ', req.query.tokenOwner);
	const _tokenOwner: any = req.query.tokenOwner;
	const result = await sm.getFromContract("balanceOf", _tokenOwner, "");
	return res.json(result);
}

export const allowance = async (req: Request, res: Response) => {
	console.log(req.body);
	const _owner: any = req.query.owner;
	const _delegate: any = req.query.delegate;
	const result = await sm.getFromContract("allowance", _owner, _delegate);
	return res.json(result);
}

export const transfer = async (req: Request, res: Response) => {
	console.log(req.body);
	const _receiver: string = req.body.receiver;
	const _numTokens: string = req.body.numTokens;
	const result = await sm.putToContract("transfer", _receiver, _numTokens, "");
	return res.json(result);
}

export const approve = async (req: Request, res: Response) => {
	console.log(req.body);
	const _delegate: string = req.body.delegate;
	const _numTokens: string = req.body.numTokens;
	const result = await sm.putToContract("approve", _delegate, _numTokens, "");
	return res.json(result);
}

export const transferFrom = async (req: Request, res: Response) => {
	console.log(req.body);
	const _owner: string = req.body.owner;
	const _buyer: string = req.body.buyer;
	const _numTokens: string = req.body.numTokens;
	const result = await sm.putToContract("transferFrom", _owner, _buyer, _numTokens);
	return res.json(result);
}
