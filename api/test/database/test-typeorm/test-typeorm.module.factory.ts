import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationLoader, entities } from 'src/global';

export const TestTypeormModuleFactory = (
	database: string,
	options?: any,
): DynamicModule =>
	TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: () => {
			const config = ConfigurationLoader.load();

			return {
				type: 'mysql',
				host: config.TYPEORM_HOST,
				port: config.TYPEORM_PORT,
				database,
				username: config.TYPEORM_USERNAME,
				password: config.TYPEORM_PASSWORD,
				synchronize: config.TYPEORM_SYNCHRONIZE,
				logging: config.TYPEORM_LOGGING,
				bigNumberStrings: false,
				entities,
				migrations: [],
				subscribers: [],
				...options,
			};
		},
	});
