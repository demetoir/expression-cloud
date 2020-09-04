const { createConnection } = require('typeorm');
const { ormConfig } = require('./src/common/model/configLoader');
const _ = require('lodash');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = async () => {
	let connection;
	const MAX_RETRY = 5;
	const SLEEP_TIME = 5000;

	for await (let i of _.range(0, MAX_RETRY)) {
		try {
			connection = await createConnection({
				...ormConfig,
				dropSchema: true,
			});

			break;
		} catch (e) {
			console.log(`can not connect to db retry ${i}`);
		}

		console.log(`sleep wait for db ${SLEEP_TIME}ms`);
		await sleep(SLEEP_TIME);
	}

	if (!connection) {
		throw new Error(
			'can not connection to db, even if retry for MAX_RETRY',
		);
	}

	console.log('success to connect test db');

	console.log('start sync db by typeorm');
	await connection.synchronize();

	console.log('end sync db by typeorm ');

	global.connection = connection;

	console.log('end global setup');
};
