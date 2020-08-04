import { resolve } from 'path';

export function loadDotEnv({ devPath, prodPath }): void {
	const NODE_ENV = process.env.NODE_ENV || 'development';

	console.log(`load dot env as ${NODE_ENV} mode`);

	let path;
	if (NODE_ENV === 'development') {
		path = devPath;
	} else if (NODE_ENV === 'production') {
		path = prodPath;
	} else {
		throw new Error(`NODE_ENV ${NODE_ENV} is not expected value`);
	}

	path = resolve(path);
	require('dotenv').config({ path });
}
