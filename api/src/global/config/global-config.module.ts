import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurationLoader } from './configurationLoader';
import { NodeConfigService } from './node-config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configurationLoader],
			isGlobal: true,
		}),
	],
	providers: [NodeConfigService],
})
export class GlobalConfigModule {}
