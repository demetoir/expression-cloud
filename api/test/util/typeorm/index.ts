import { Connection, createConnection } from 'typeorm';
import { range } from 'lodash';
import { prepareSchema1603608484576 } from './migration/1603608484576-prepare-schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotEnv = require('dotenv').config({
	path: `${__dirname}/../../../env/.env.test`,
}).parsed;

export async function getConnectionForTest(config?): Promise<Connection> {
	return await createConnection({
		type: dotEnv.TYPEORM_TYPE,
		host: dotEnv.TYPEORM_HOST,
		port: dotEnv.TYPEORM_PORT,
		username: dotEnv.TYPEORM_USERNAME,
		password: dotEnv.TYPEORM_PASSWORD,
		database: dotEnv.TYPEORM_DATABASE,
		logging: dotEnv.TYPEORM_LOGGING,
		bigNumberStrings: false,
		entities: [`${__dirname}/../../../src/**/*.entity.ts`],
		...config,
	});
}

const MAX_RETRY = 8;
const SLEEP_TIME = 100;
export const prepareDatabaseSchema = async (config?) => {
	console.debug('connect to database');

	let sleepTime = SLEEP_TIME;
	let connection = null;
	for await (const _ of range(0, MAX_RETRY)) {
		try {
			connection = await createConnection({
				...config,
				migrations: [prepareSchema1603608484576],
			});
		} catch (e) {
			if (e.name === 'AlreadyHasActiveConnectionError') {
				break;
			}

			throw e;
		}

		console.debug(`sleep wait for db ${sleepTime}ms`);
		await sleep(sleepTime);
		sleepTime *= 2;
	}

	if (!connection) {
		throw new Error('can not connect to test database');
	}

	console.debug('drop database');
	await connection.dropDatabase();

	console.debug('run migration');
	await connection.runMigrations({ transaction: 'all' });

	console.debug('close connection');
	await connection.close();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
