import { resolve } from 'path';
import * as dotenv from 'dotenv';

export const getDotEnv = (nodeEnv = 'development') => {
	const mapper = {
		development: `${__dirname}/.env.dev`,
		production: `${__dirname}/.env.prod`,
		test: `${__dirname}/.env.test`,
	};

	if (!(nodeEnv in mapper)) {
		throw new Error(`NODE_ENV ${nodeEnv} is not expected value`);
	}

	const path = resolve(mapper[nodeEnv]);

	return dotenv.config({ path }).parsed;
};
