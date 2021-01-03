import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import { NodeConfigService } from 'src/config';
import { CustomMorgan } from 'src/common';
import { AppModule } from './app.module';

function initSecurity(app) {
	// cors
	app.enableCors();

	app.set('trust proxy', true);

	// https://github.com/graphql/graphql-playground/issues/1283
	app.use(
		helmet({
			contentSecurityPolicy:
				process.env.NODE_ENV === 'production' ? undefined : false,
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
