import { createConnection } from 'typeorm';
import { config } from '../common/model/configLoader';
import { DATABASE_CONNECTION } from '../common/constants/provider.constant';

export const databaseProviders = [
	{
		provide: DATABASE_CONNECTION,
		useFactory: async () => await createConnection(config),
	},
];
