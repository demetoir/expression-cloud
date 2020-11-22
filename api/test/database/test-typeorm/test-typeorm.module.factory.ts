import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { entities } from 'src/database/global-typeorm/entity.loader';
import { configurationLoader } from 'src/config/configurationLoader';

export const TestTypeormModuleFactory = (
	database: string,
	options?: any,
): DynamicModule => {
	return TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: () => {
			const config = configurationLoader();

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
};
