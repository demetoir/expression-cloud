import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomMorgan } from '../common/middlewares/loggerMiddlewares';
import * as helmet from 'helmet';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as expectCt from 'expect-ct';
import * as rateLimit from 'express-rate-limit';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NodeConfigService } from '../config/NodeConfig.service';
import { OpenApiDocConfigService } from '../config/openApiDocConfig.service';
import { documentBuilderSingleton } from '../common/libs/nestjsCRUDToolkit';
import { SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc/dist';
import { INestApplication } from '@nestjs/common';

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

function initSecurity(app) {
	//cors
	app.enableCors();

	app.set('trust proxy', 1);

	// helmet
	app.use(helmet());
	// TODO: set additional helmet setting
	// app.use(helmet.contentSecurityPolicy({
	//     directives: {
	//         defaultSrc: ["'self'"],
	//         styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
	//     }
	// }))
	// app.use(helmet.permittedCrossDomainPolicies())
	// app.use(helmet.referrerPolicy({policy: 'same-origin'}))

	app.use(
		expectCt({
			enforce: true,
			maxAge: 123,
		}),
	);

	// TODO 이거 옵션 조정하기
	// app.use(csurf({cookie: true}));

	// todo 이거 옵션 조정하기
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
		}),
	);

	// TODO: add html sanitize

	// TODO: add xss protector

	// TODO: add sql injection protector
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
