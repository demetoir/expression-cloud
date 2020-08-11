import { resolve } from 'path';

const DEFAULT_DEV_DOT_ENV_PATH =
	__dirname + '/../../../.env/api-server.dev.env';
const DEFAULT_PROD_DOT_ENV_PATH = __dirname + '/../../../.env/api-server.env';
// todo: e2e test 시에는 configuration module 이랑 .env 처리방식 정하기
const DEFAULT_TEST_DOT_ENV_PATH =
	__dirname + '/../../../.env/api-server.env.sample';

function loadDotEnv({ devPath, prodPath, testPath }): any {
	const NODE_ENV = process.env.NODE_ENV || 'development';

	console.log(`load dot env as ${NODE_ENV} mode`);

	let path;
	if (NODE_ENV === 'development') {
		path = devPath;
	} else if (NODE_ENV === 'production') {
		path = prodPath;
	} else if (NODE_ENV === 'test') {
		path = testPath;
	} else {
		throw new Error(`NODE_ENV ${NODE_ENV} is not expected value`);
	}

	path = resolve(path);
	return require('dotenv').config({ path }).parsed;
}

const env = loadDotEnv({
	devPath: DEFAULT_DEV_DOT_ENV_PATH,
	prodPath: DEFAULT_PROD_DOT_ENV_PATH,
	testPath: DEFAULT_TEST_DOT_ENV_PATH,
});

export const configurationLoader = (): any => ({
	// node
	NODE_PORT: parseInt(env.NODE_PORT, 10),
	NODE_ENV: env.NODE_ENV,

	// mysql
	MYSQL_HOST: env.MYSQL_HOST,
	MYSQL_PORT: parseInt(env.MYSQL_PORT, 10),
	MYSQL_SCHEME: env.MYSQL_SCHEME,
	MYSQL_USER: env.MYSQL_USER,
	MYSQL_PASSWORD: env.MYSQL_PASSWORD,

	// typeorm
	TYPEORM_TYPE: env.TYPEORM_TYPE,

	// redis
	REDIS_HOST: env.REDIS_HOST,
	REDIS_PORT: parseInt(env.REDIS_PORT, 10),

	// JWT
	JWT_SECRET: env.JWT_SECRET,

	//api doc end point path
	SWAGGER_UI_PATH: env.SWAGGER_UI_PATH,
	REDOC_PATH: env.REDOC_PATH,
});
