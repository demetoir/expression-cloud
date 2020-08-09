import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurationLoader } from './configurationLoader';
import { NodeConfigService } from './NodeConfig.service';
import { SwaggerUIConfigService } from './swaggerUIConfig.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configurationLoader],
			isGlobal: true,
		}),
	],
	providers: [NodeConfigService, SwaggerUIConfigService],
})
export class GlobalConfigModule {}
