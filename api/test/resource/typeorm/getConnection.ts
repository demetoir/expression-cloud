// prepare connection and repository
import { Connection, createConnection } from 'typeorm/index';
import { entities } from '../../../src/database/global-typeorm/entity.loader';

export async function getConnection(): Promise<Connection> {
	return await createConnection({
		entities,
		type: 'mysql',
		host: 'localhost',
		port: 3307,
		username: 'user',
		password: 'password',
		database: 'expression_cloud',
		synchronize: false,
		logging: false,
		bigNumberStrings: false,
	});
}
