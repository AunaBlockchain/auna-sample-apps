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
 * @description Common functionality
 */

// Libs imports
import { utils } from '@bcs/baas-common';
//import { auna } from '@bcs/baas-protos';
import path from 'path';

// Config Interface
export interface Config {
	host: string,
	port: number,
	timeout: number,
	root: string
}

// Global app config
export let config: Config;

/**
 * Set-up the common module
 * @param configPath 
 */
export const setup = (configPath?: string): Config => {
	if (!configPath) {
		configPath = path.join(__dirname, '../../config/config.yaml');
	}

	const conf = utils.getConfig();
	conf.file(configPath);
	config = conf.get();

	return config;
}