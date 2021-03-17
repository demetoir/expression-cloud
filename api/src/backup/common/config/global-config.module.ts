import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './configuration';

@Module({
	imports: [
		ConfigModule.forRoot({
			expandVariables: true,
			load: [configLoader],
		}),
	],
})
export class GlobalConfigModule {}
