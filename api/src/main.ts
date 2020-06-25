import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CustomMorgan } from './middlewares/loggerMiddlewares';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(CustomMorgan());

	initSwagger(app);

	await app.listen(3000);
}

bootstrap();

function initSwagger(app) {
	const options = new DocumentBuilder()
		.setTitle('Expression Cloud')
		.setDescription('Expression Cloud')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('/api/v1', app, document);
}
