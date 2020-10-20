import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entity.loader';
import { configurationLoader } from 'src/config/configurationLoader';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () => {
				const config = configurationLoader();

				return {
					type: 'mysql',
					host: config.TYPEORM_HOST,
					port: config.TYPEORM_PORT,
					database: config.TYPEORM_DATABASE,
					username: config.TYPEORM_USERNAME,
					password: config.TYPEORM_PASSWORD,
					synchronize: config.TYPEORM_SYNCHRONIZE,
					logging: config.TYPEORM_LOGGING,
					bigNumberStrings: false,
					entities: entities,
					migrations: [],
					subscribers: [],
				};
			},
		}),
	],
})
export class GlobalTypeormModule {}
