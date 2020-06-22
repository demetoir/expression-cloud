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
	entities: [`../model/entity/**/*.entity.ts`],
	migrations: [`../src/model/migration/**/*.ts`],
	cli: {
		migrationsDir: `../src/model/migration`,
	},
	subscribers: [`../src/model/subscriber/**/*.ts`],
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
	entities: [`../src/model/entity/**/*.entity.js`],
	migrations: [`../src/model/migration/**/*.js`],
	cli: {
		migrationsDir: `../src/model/migration`,
	},
	subscribers: [`../src/model/subscriber/**/*.js`],
};

const test = {
	type: 'sqlite',
	database: ':memory:',
	synchronize: true,
	logging: false,
	bigNumberStrings: false,
	entities: [`${__dirname}/src/model/entity/**/*.entity.ts`],
	migrations: [`${__dirname}/src/model/migration/**/*.ts`],
	cli: {
		migrationsDir: `${__dirname}/src/model/migration`,
	},
	subscribers: [`${__dirname}/src/model/subscriber/**/*.ts`],
};

let config;
const node_env = process.env.NODE_ENV || 'dev';
if (node_env === 'dev') {
	config = dev;
} else if (node_env === 'test') {
	config = test;
} else if (node_env === 'production') {
	config = prod;
} else {
	throw new Error(`node_env expect one of dev, test, prod, but ${node_env}`);
}

console.info(`load typeorm config as ${node_env}`);
console.log(config);

module.exports = config;
