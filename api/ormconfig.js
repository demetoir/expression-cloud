const dev = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'user',
	password: 'password',
	database: 'expression_cloud',
	synchronize: false,
	logging: false,
	bigNumberStrings: false,
	entities: ['src/model/entity/**/*.entity.ts'],
	migrations: ['src/model/migration/**/*.ts'],
	cli: {
		migrationsDir: 'src/model/migration',
	},
	subscribers: ['src/model/subscriber/**/*.ts'],
};

const prod = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'user',
	password: 'password',
	database: 'expression_cloud',
	synchronize: false,
	logging: false,
	bigNumberStrings: false,
	entities: ['src/model/entity/**/*.entity.ts'],
	migrations: ['src/model/migration/**/*.ts'],
	cli: {
		migrationsDir: 'src/model/migration',
	},
	subscribers: ['src/model/subscriber/**/*.ts'],
};

const test = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'user',
	password: 'password',
	database: 'expression_cloud',
	synchronize: false,
	logging: false,
	bigNumberStrings: false,
	entities: ['src/model/entity/**/*.entity.ts'],
	migrations: ['src/model/migration/**/*.ts'],
	cli: {
		migrationsDir: 'src/model/migration',
	},
	subscribers: ['src/model/subscriber/**/*.ts'],
};

let config;
const node_env = process.env.NODE_ENV || 'dev';
if (node_env === 'dev') {
	config = dev;
} else if (node_env === 'test') {
	config = test;
} else if (node_env === 'prod') {
	config = prod;
} else {
	throw new Error(`node_env expect one of dev, test, prod, but ${node_env}`);
}

console.log(`load typeorm config as ${node_env}`);

module.exports = config;
