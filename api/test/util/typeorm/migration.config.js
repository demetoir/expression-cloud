// connection option for prepare test database schema
const dotEnv = require('dotenv').config({
	path: `${__dirname}/../../../env/.env.test`,
}).parsed;

module.exports = {
	type: dotEnv.TYPEORM_TYPE,
	host: dotEnv.TYPEORM_HOST,
	port: dotEnv.TYPEORM_PORT,
	username: dotEnv.TYPEORM_USERNAME,
	password: dotEnv.TYPEORM_PASSWORD,
	database: dotEnv.TYPEORM_DATABASE,
	logging: dotEnv.TYPEORM_LOGGING,
	entities: ['./src/**/*.entity.ts'],
	migrations: ['./test/resource/typeorm/migration/**/*.ts'],
	cli: {
		migrationsDir: './test/resource/typeorm/migration'
	}
};
