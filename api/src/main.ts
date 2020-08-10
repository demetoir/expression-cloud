import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CustomMorgan } from './common/middlewares/loggerMiddlewares';
import * as helmet from 'helmet';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as expectCt from 'expect-ct';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NodeConfigService } from './config/NodeConfig.service';
import { SwaggerUIConfigService } from './config/swaggerUIConfig.service';
import { swaggerHelperSingleton } from './openApiHelper';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const nodeConfigService = app.get(NodeConfigService);

	if (nodeConfigService.isDevMode()) {
		app.use(CustomMorgan());
	}

	initSecurity(app);

	swaggerHelperSingleton.documentBuilder
		.setTitle('Expression Cloud')
		.setDescription('Expression Cloud')
		.setVersion('1.0')
		.addTag('User', 'description');

	const swaggerUIConfigService = app.get(SwaggerUIConfigService);
	await swaggerHelperSingleton.setup(app, swaggerUIConfigService.path);

	await app.listen(nodeConfigService.port);

	console.log(`app listen port ${nodeConfigService.port}`);
}

bootstrap()
	.then(() => {
		console.log('complete bootstrapping app');
	})
	.catch((e) => {
		console.error('fail to bootstrap app');
		console.error(e);
	});

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
