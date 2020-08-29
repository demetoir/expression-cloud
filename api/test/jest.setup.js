const { createConnection } = require('typeorm');
const { ormConfig } = require('../src/common/model/configLoader');

module.exports = async () => {
	const connection = await createConnection({
		...ormConfig,
		dropSchema: true,
	});
	await connection.synchronize();

	global.connection = connection;
};
