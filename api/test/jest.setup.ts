import { prepareDatabaseSchema } from './util/typeorm';

module.exports = async () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const dotEnv = require('dotenv').config({
		path: `${__dirname}/../env/.env.test`,
	}).parsed;

	await prepareDatabaseSchema({
		type: dotEnv.TYPEORM_TYPE,
		host: dotEnv.TYPEORM_HOST,
		port: dotEnv.TYPEORM_PORT,
		username: dotEnv.TYPEORM_USERNAME,
		password: dotEnv.TYPEORM_PASSWORD,
		database: dotEnv.TYPEORM_DATABASE,
		logging: dotEnv.TYPEORM_LOGGING,
	});
};
