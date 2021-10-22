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
import * as modelGoCC from '../models/sampleModelGoCC';
import * as modelNodeCC from '../models/sampleModelNodeCC';

export const echo = (req: Request, res: Response) => {
	const msg = req.body.message;
	return res.json({ message: msg });
}

// Golang-CC calls

export const initGoCC = async (req: Request, res: Response) => {
	const result = await modelGoCC.init();
	return res.json(result);
}

export const pingGoCC = async (req: Request, res: Response) => {
	const result = await modelGoCC.ping();
	return res.json(result);
}

export const findGoCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelGoCC.find(args);
	return res.json(result);
}

export const findJGoCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelGoCC.findJ(args);
	return res.json(result);
}

export const storeGoCC = async (req: Request, res: Response) => {
	console.log(req.body);
	const isin: string = req.body.isin;
	const symbol: string = req.body.symbol;
	const description: string = req.body.description;
	const price: string = req.body.price;
	const result = await modelGoCC.store(isin, symbol, description, price);
	return res.json(result);
}

// Node-CC calls

export const initNodeCC = async (req: Request, res: Response) => {
	const result = await modelNodeCC.init();
	return res.json(result);
}

export const pingNodeCC = async (req: Request, res: Response) => {
	const result = await modelNodeCC.ping();
	return res.json(result);
}

export const queryCustomersNodeCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelNodeCC.queryCustomers(args);
	return res.json(result);
}

export const queryCustomersJNodeCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelNodeCC.queryCustomersJ(args);
	return res.json(result);
}

export const queryAllCustomersNodeCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelNodeCC.queryAllCustomers(args);
	return res.json(result);
}

export const queryAllCustomersJNodeCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelNodeCC.queryAllCustomersJ(args);
	return res.json(result);
}

export const queryCustomerHistoryNodeCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelNodeCC.queryCustomerHistory(args);
	return res.json(result);
}

export const createCustomerNodeCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelNodeCC.createCustomer(args);
	return res.json(result);
}

export const addCustomerFundsNodeCC = async (req: Request, res: Response) => {
	const args = req.body.args || {};
	const result = await modelNodeCC.addCustomerFunds(args);
	return res.json(result);
}

export const sendHistoryByMailNodeCC = async (req: Request, res: Response) => {
	const rut = req.body.rut || '';
	const email = req.body.email || '';
	const result = await modelNodeCC.sendHistoryByMail(rut, email);
	return res.json(result);
}