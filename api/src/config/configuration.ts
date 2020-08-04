import { loadDotEnv } from '../common/libs/dotenvLoader';

const DEFAULT_DEV_DOT_ENV_PATH = __dirname + '/../../.env/api-server.dev.env';
const DEFAULT_PROD_DOT_ENV_PATH = __dirname + '/../../.env/api-server.env';

loadDotEnv({
	devPath: DEFAULT_DEV_DOT_ENV_PATH,
	prodPath: DEFAULT_PROD_DOT_ENV_PATH,
});

const env = process.env;
export default (): any => ({
	// node
	NODE_PORT: parseInt(env.PORT, 10) || 3000,
	NODE_ENV: env.NODE_ENV,

	// mysql
	MYSQL_HOST: env.MYSQL_HOST,
	MYSQL_PORT: parseInt(env.MYSQL_PORT, 10) || 3369,
	MYSQL_SCHEME: env.MYSQL_SCHEME,
	MYSQL_USER: env.MYSQL_USER,
	MYSQL_PASSWORD: env.MYSQL_PASSWORD,

	// typeorm
	TYPEORM_TYPE: env.TYPEORM_TYPE,

	// redis
	REDIS_HOST: env.REDIS_HOST,
	REDIS_PORT: parseInt(env.REDIS_PORT, 10) || 6379,

	// JWT
	JWT_SECRET: env.JWT_SECRET,
});
