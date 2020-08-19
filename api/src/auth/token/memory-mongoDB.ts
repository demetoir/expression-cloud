// import { MongoMemoryServer } from 'mongodb-memory-server';
//
//
//
//
// const mongod = new MongoMemoryServer({
// 	instance: {
// 		port?: number, // by default choose any free port
// 		ip?: string, // by default '127.0.0.1', for binding to all IP addresses set it to `::,0.0.0.0`,
// 		dbName?: string, // by default generate random dbName
// 		dbPath?: string, // by default create in temp directory
// 		storageEngine?: string, // by default `ephemeralForTest`, available engines: [ 'devnull', 'ephemeralForTest', 'mmapv1', 'wiredTiger' ]
// 		replSet?: string, // by default no replica set, replica set name
// 		auth?: boolean, // by default `mongod` is started with '--noauth', start `mongod` with '--auth'
// 		args?: string[], // by default no additional arguments, any additional command line arguments for `mongod` `mongod` (ex. ['--notablescan'])
// 	},
// 	binary: {
// 		version?: string, // by default 'latest'
// 		downloadDir?: string, // by default node_modules/.cache/mongodb-memory-server/mongodb-binaries
// 		platform?: string, // by default os.platform()
// 		arch?: string, // by default os.arch()
// 		checkMD5?: boolean, // by default false OR process.env.MONGOMS_MD5_CHECK
// 		systemBinary?: string, // by default undefined or process.env.MONGOMS_SYSTEM_BINARY
// 	},
// 	autoStart?: boolean, // by default true
// });
//
// // const uri = await mongod.getUri();
// // const port = await mongod.getPort();
// // const dbPath = await mongod.getDbPath();
// // const dbName = await mongod.getDbName();
// //
// // // some code
// // //   ... where you may use `uri` for as a connection string for mongodb or mongoose
// //
// // // you may check instance status, after you got `uri` it must be `true`
// // mongod.getInstanceInfo(); // return Object with instance data
// //
// // // you may stop mongod manually
// // await mongod.stop();
// //
// // // when mongod killed, it's running status should be `false`
// // mongod.getInstanceInfo();
