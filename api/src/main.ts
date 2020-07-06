import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CustomMorgan } from './middlewares/loggerMiddlewares';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as expectCt from 'expect-ct';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(CustomMorgan());

	initSecurity(app);

	initSwagger(app);

	await app.listen(3000);
}

bootstrap();

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

function initSwagger(app) {
	const options = new DocumentBuilder()
		.setTitle('Expression Cloud')
		.setDescription('Expression Cloud')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('/api/v1', app, document);
}
