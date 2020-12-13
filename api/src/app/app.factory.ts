import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { CustomMorgan } from '../common/middlewares/loggerMiddlewares';
import { NodeConfigService } from '../config/NodeConfig.service';

function initSecurity(app) {
	// cors
	app.enableCors();

	app.set('trust proxy', 1);

	app.use(helmet());

	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
		}),
	);
}

export async function appFactory(expressApp: any): Promise<INestApplication> {
	const app = await NestFactory.create(
		AppModule,
		new ExpressAdapter(expressApp),
	);

	// const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const nodeConfigService = app.get(NodeConfigService);

	if (nodeConfigService.isDevMode()) {
		app.use(CustomMorgan());
	}

	initSecurity(app);

	return app;
}
