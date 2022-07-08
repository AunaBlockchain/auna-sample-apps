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
 * @description Expressjs API router
 */

// Libs imports
import { utils } from '@bcs/baas-common';
import { Express, Request, Response, NextFunction, Router } from 'express';
import * as sampleController from '../controllers/sampleController';

const logger = utils.getLogger('internal-api-sample-router');

export const setup = (root: string, app: Express) => {

	const asyncMiddleware = (fn: Function) =>
		(req: Request, res: Response, next: NextFunction) => {
			Promise.resolve(fn(req, res, next))
				.catch(err => next(err));
		};

	const router = Router();

	router.get('/', (req, res, next) => {
		res.send('AUNA - Sample API');
	});

	router.get('/ping', (req, res, next) => {
		res.send('pong');
	});

	router.post('/helloworld/setName', asyncMiddleware(sampleController.setName));
	router.post('/helloworld/getName', asyncMiddleware(sampleController.getName));
	router.post('/helloworld/setAge', asyncMiddleware(sampleController.setAge));
	router.post('/helloworld/getAge', asyncMiddleware(sampleController.getAge));

	router.post('/echo', asyncMiddleware(sampleController.echo));
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		logger.error(err);
		res.status(500).json(err.message);
	});

	app.use(root, router);
}