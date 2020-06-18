import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CustomMorgan } from './middlewares/loggerMiddlewares';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(CustomMorgan());

	await app.listen(3000);
}

bootstrap();
