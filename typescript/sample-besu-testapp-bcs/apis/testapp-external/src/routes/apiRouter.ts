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
 * @description API router
 */

// Libs imports
import { utils } from '@bcs/baas-common';
import { Express, Request, Response, NextFunction, Router } from 'express';
import * as sampleController from '../controllers/sampleController';

const logger = utils.getLogger('sample-external-api-router');

export const setup = (root: string, app: Express) => {

	const asyncMiddleware = (fn: Function) =>
		(req: Request, res: Response, next: NextFunction) => {
			Promise.resolve(fn(req, res, next)).catch(err => next(err));
		};

	const asyncMiddlewareFwd = (model: string, method: string) =>
		(req: Request, res: Response, next: NextFunction) => {
			Promise.resolve(sampleController.forward(req, res, model, method)).catch(err => next(err));
		};

	const router = Router();

	router.get('/', (req, res, next) => {
		res.send('AUNA - TestApp BESU - v1.0.1');
	});

	router.get('/ping', (req, res, next) => {
		res.send('pong');
	});

	router.post('/echo', asyncMiddleware(sampleController.echo));
	router.post('/echo-internal', asyncMiddleware(sampleController.echoInternal));

	router.post('/helloworld/setName', asyncMiddlewareFwd('helloworld', 'setName'));
	router.post('/helloworld/getName', asyncMiddlewareFwd('helloworld', 'getName'));
	router.post('/helloworld/setAge', asyncMiddlewareFwd('helloworld', 'setAge'));
	router.post('/helloworld/getAge', asyncMiddlewareFwd('helloworld', 'getAge'));

	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		logger.error(err);
		res.status(500).json(err.message);
	});

	app.use(root, router);
}