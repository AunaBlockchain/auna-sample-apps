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

// Libs imports
import express from 'express';
import http from 'http';
import cors from 'cors';
import { utils } from '@bcs/baas-common';
import * as commons from './models/commons';

//////////////////////
// Init Application //
//////////////////////
commons.setup();
const logger = utils.getLogger('sample-internal-api');

logger.info('Initializing Sample Internal API');

const app = express();

app.options('*', cors() as any);
app.use(cors());

// Support parsing of application/json type post data
app.use(express.json({ limit: '50mb' }));
// Support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({
	extended: false,
	limit: '50mb'
}));

import * as init from './init';
init.initVars();

//////////////////
// Start Server //
//////////////////

import * as router from './routes/apiRouter';
router.setup(commons.config.root, app);

const server = http.createServer(app).listen(commons.config.port, commons.config.host);

logger.info('BCS SL API Server started');
logger.info('Listening at: [http://%s:%s%s]', commons.config.host, commons.config.port, commons.config.root);
server.timeout = commons.config.timeout;
