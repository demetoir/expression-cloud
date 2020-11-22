import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import { RedocModule, RedocOptions } from 'nestjs-redoc/dist';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { CustomMorgan } from '../common/middlewares/loggerMiddlewares';
import { NodeConfigService } from '../config/NodeConfig.service';
import { OpenApiDocConfigService } from '../config/openApiDocConfig.service';
import { documentBuilderSingleton } from '../common/libs/nestjsCRUDToolkit';

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

async function initOpenApiDoc(app) {
	documentBuilderSingleton
		.setTitle('Expression Cloud')
		.setDescription('Expression Cloud')
		.setVersion('1.0');

	const openApiDocConfig: OpenApiDocConfigService = app.get(
		OpenApiDocConfigService,
	);

	const document = SwaggerModule.createDocument(
		app,
		documentBuilderSingleton.build(),
	);

	SwaggerModule.setup(openApiDocConfig.swaggerUIPath, app, document);

	const redocOptions: RedocOptions = {
		title: 'Hello Nest',
		logo: {
			url: 'https://redocly.github.io/redoc/petstore-logo.png',
			backgroundColor: '#F0F0F0',
			altText: 'PetStore logo',
		},
		sortPropsAlphabetically: true,
		hideDownloadButton: false,
		hideHostname: false,
	};
	await RedocModule.setup(
		openApiDocConfig.redocPath,
		app,
		document,
		redocOptions,
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

	await initOpenApiDoc(app);

	return app;
}
