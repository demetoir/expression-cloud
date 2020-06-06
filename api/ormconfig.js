const node_env = process.env.NODE_ENV;

// todo 여기에서 node env 에 따라 다르게 나오도록 만들기
// 		production, dev, test 다르게...

module.exports = {
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "user",
	password: "password",
	database: "expression_cloud",
	synchronize: false,
	logging: false,
	bigNumberStrings: false,
	entities: [
		"src/model/entity/**/*.ts"
	],
	migrations: [
		"src/model/migration/**/*.ts"
	],
	cli: {
		"migrationsDir": "src/model/migration"
	},
	subscribers: [
		"src/model/subscriber/**/*.ts"
	]
}
