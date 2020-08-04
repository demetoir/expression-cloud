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
	// entities dose not use in nest.js configLoader intercept properties
	entities: [`./src/common/model/entity/**/*.entity.ts`],
	migrations: [`./src/common/model/migration/**/*.ts`],
	cli: {
		migrationsDir: `./src/common/model/migration`,
	},
	// subscribers dose not use in nest.js configLoader intercept properties
	subscribers: [`./src/common/model/subscriber/**/*.ts`],
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
	// entities dose not use in nest.js configLoader intercept properties
	entities: [`../src/common/model/entity/**/*.entity.js`],
	migrations: [`${__dirname}/src/common/model/migration/**/*.ts`],
	cli: {
		migrationsDir: `${__dirname}/src/common/model/migration`,
	},
	// subscribers dose not use in nest.js configLoader intercept properties
	subscribers: [`../src/common/model/subscriber/**/*.js`],
};

const test = {
	type: 'sqlite',
	database: ':memory:',
	synchronize: true,
	logging: false,
	bigNumberStrings: false,
	entities: [`${__dirname}/src/common/model/entity/**/*.entity.ts`],
	migrations: [`${__dirname}/src/common/model/migration/**/*.ts`],
	cli: {
		migrationsDir: `${__dirname}/src/common/model/migration`,
	},
	subscribers: [`${__dirname}/src/common/model/subscriber/**/*.ts`],
};

let config;
const node_env = process.env.NODE_ENV || 'development';
if (node_env === 'development') {
	config = dev;
} else if (node_env === 'test') {
	config = test;
} else if (node_env === 'production') {
	config = prod;
} else {
	throw new Error(`node_env expect one of dev, test, prod, but ${node_env}`);
}

module.exports = config;
