import * as dotenv from 'dotenv';
import { resolve } from 'path';

/**
 * parse node environment variable
 * if NODE_PORT is falsy, use default value 3000
 *
 * @param env parsed node env
 */
export const parseNodeEnv = (env: any) => {
	let NODE_PORT = parseInt(env.NODE_PORT, 10);

	if (Number.isNaN(NODE_PORT)) {
		console.warn(`env NODE_PORT is not a number, use default port 3000`);

		NODE_PORT = 3000;
	}

	return {
		NODE_PORT,
		NODE_ENV: env.NODE_ENV,
	};
};

/**
 * parse typeorm environment variable
 * if any invalid value found, will raise error
 *
 * @param env
 */
export const parseTypeormEnv = (env) => {
	const { TYPEORM_DATABASE_TYPE } = env;

	if (TYPEORM_DATABASE_TYPE !== 'mysql') {
		throw TypeError(
			`env TYPEORM_DATABASE_TYPE expect mysql not '${TYPEORM_DATABASE_TYPE}'`,
		);
	}

	const { TYPEORM_HOST } = env;

	if (!TYPEORM_HOST) {
		throw TypeError(
			`env TYPEORM_HOST expect not a falsy value but '${TYPEORM_HOST}'`,
		);
	}

	const TYPEORM_PORT = parseInt(env.TYPEORM_PORT, 10);

	if (Number.isNaN(TYPEORM_PORT)) {
		throw TypeError(
			`env TYPEORM_PORT expect not NaN but '${TYPEORM_PORT}'`,
		);
	}

	const { TYPEORM_DATABASE } = env;

	if (!TYPEORM_DATABASE) {
		throw TypeError(
			`env TYPEORM_DATABASE expect not a falsy value but '${TYPEORM_DATABASE}'`,
		);
	}

	const { TYPEORM_USERNAME } = env;

	if (!TYPEORM_USERNAME) {
		throw TypeError(
			`env TYPEORM_USERNAME expect not a falsy value but '${TYPEORM_USERNAME}'`,
		);
	}

	const { TYPEORM_PASSWORD } = env;

	if (!TYPEORM_PASSWORD) {
		throw TypeError(
			`env TYPEORM_PASSWORD expect not a falsy value but '${TYPEORM_PASSWORD}'`,
		);
	}

	const TYPEORM_LOGGING = !!env.TYPEORM_LOGGING;

	if (!TYPEORM_LOGGING) {
		console.warn(
			'env TYPEORM_LOGGING is not specified, use default value `false`',
		);
	}

	const TYPEORM_SYNCHRONIZE = !!env.TYPEORM_SYNCHRONIZE;

	if (!TYPEORM_SYNCHRONIZE) {
		console.warn(
			'env TYPEORM_SYNCHRONIZE is not specified, use default value `false`',
		);
	}

	if (TYPEORM_SYNCHRONIZE === true) {
		console.warn(
			'env TYPEORM_SYNCHRONIZE set true, will synchronize database schema',
		);
	}

	return {
		TYPEORM_DATABASE_TYPE,
		TYPEORM_HOST,
		TYPEORM_PORT,
		TYPEORM_DATABASE,
		TYPEORM_USERNAME,
		TYPEORM_PASSWORD,
		TYPEORM_LOGGING,
		TYPEORM_SYNCHRONIZE,
	};
};

export const parseEtcEnv = (env: any) => {
	let { LOGGING_PATH } = env;

	if (!LOGGING_PATH) {
		console.warn(`env LOGGING_PATH is not specified, use default './.log'`);

		LOGGING_PATH = './.log';
	}

	return {
		LOGGING_PATH,
	};
};

export const parseJWTEnv = (env: any) => {
	const { JWT_ACCESS_TOKEN_SECRET } = env;

	if (!JWT_ACCESS_TOKEN_SECRET) {
		throw new TypeError(`JWT_ACCESS_TOKEN_SECRET should specified but not`);
	}

	const { JWT_REFRESH_TOKEN_SECRET } = env;

	if (!JWT_REFRESH_TOKEN_SECRET) {
		throw new TypeError(
			`JWT_REFRESH_TOKEN_SECRET should specified but not`,
		);
	}

	const { JWT_ISSUER } = env;

	if (!JWT_ISSUER) {
		throw new TypeError(`JWT_ISSUER should specified but not`);
	}

	const JWT_ACCESS_TOKEN_DURATION = parseInt(
		env.JWT_ACCESS_TOKEN_DURATION,
		10,
	);

	if (Number.isNaN(JWT_ACCESS_TOKEN_DURATION)) {
		throw new TypeError(`JWT_ACCESS_TOKEN_DURATION should number but not`);
	}

	const JWT_REFRESH_TOKEN_DURATION = parseInt(
		env.JWT_REFRESH_TOKEN_DURATION,
		10,
	);

	if (Number.isNaN(JWT_REFRESH_TOKEN_DURATION)) {
		throw new TypeError(`JWT_ACCESS_TOKEN_DURATION should number but not`);
	}

	const { JWT_REFRESH_TOKEN_COOKIE_KEY } = env;

	if (!JWT_REFRESH_TOKEN_COOKIE_KEY) {
		throw new TypeError(
			`JWT_REFRESH_TOKEN_COOKIE_KEY should specified but not`,
		);
	}

	const { JWT_REFRESH_TOKEN_COOKIE_PATH } = env;

	if (!JWT_REFRESH_TOKEN_COOKIE_PATH) {
		throw new TypeError(
			`JWT_REFRESH_TOKEN_COOKIE_KEY should specified but not`,
		);
	}

	return {
		JWT_ACCESS_TOKEN_SECRET,
		JWT_REFRESH_TOKEN_SECRET,
		JWT_ISSUER,
		JWT_ACCESS_TOKEN_DURATION,
		JWT_REFRESH_TOKEN_DURATION,
		JWT_REFRESH_TOKEN_COOKIE_KEY,
		JWT_REFRESH_TOKEN_COOKIE_PATH,
	};
};

export const loadEnvFile = (
	envPath: string,
	NODE_ENV: 'development' | 'production' | 'test' | string,
) => {
	let path = null;

	if (NODE_ENV === 'development') {
		path = `${envPath}/.env.dev`;
	} else if (NODE_ENV === 'production') {
		path = `${envPath}/.env`;
	} else if (NODE_ENV === 'test') {
		path = `${envPath}/.env.test`;
	}
	path = resolve(path);

	// load .env file
	// .env 파일 뿐만 아니 환경변수에서 있는 값또한 가져온다.
	dotenv.config({ path });

	// parse and return config from .env
	const { env } = process;

	return {
		// node env
		...parseNodeEnv(env),

		// typeorm
		...parseTypeormEnv(env),

		// etc env
		...parseEtcEnv(env),

		// jwt env
		...parseJWTEnv(env),
	};
};

/**
 * load config from .env file and process.en
 *
 * use 'development' as default NODE_ENV
 * use *.env file in /env
 *
 */
export const configLoader = () => {
	// load .env by NODE_ENV type
	const NODE_ENV = process.env.NODE_ENV || 'development';
	// reference /env/*.env
	const rootENVPath = `${__dirname}/../../../env`;

	return loadEnvFile(rootENVPath, NODE_ENV);
};
