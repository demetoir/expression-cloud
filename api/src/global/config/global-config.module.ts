import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationLoader } from './configuration.loader';
import { NodeConfigService } from './node-config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [ConfigurationLoader.load],
			isGlobal: true,
		}),
	],
	providers: [NodeConfigService],
})
export class GlobalConfigModule {}
