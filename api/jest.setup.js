const { getConnection } = require('./test/resource/typeorm');
const { getConnectionManager } = require('typeorm');
const _ = require('lodash');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const MAX_RETRY = 8;
const SLEEP_TIME = 100;

module.exports = async () => {
	let connection;
	let sleepTime = SLEEP_TIME;

	for await (let i of _.range(0, MAX_RETRY)) {
		try {
			connection = await getConnection();
		} catch (e) {
			if (e.name === 'AlreadyHasActiveConnectionError') {
				connection = getConnectionManager().get('default');
				break;
			}
		}

		console.log(`sleep wait for db ${sleepTime}ms`);
		await sleep(sleepTime);
		sleepTime *= 2;
	}

	if (!connection) {
		throw new Error(
			'typeorm can not connection to db, even if retry for MAX_RETRY',
		);
	}

	console.log('success to connect test db');

	await connection.dropDatabase();

	console.log('start sync db by typeorm');
	await connection.synchronize();

	console.log('end sync db by typeorm ');

	global.connection = connection;

	console.log('end global setup');
};
