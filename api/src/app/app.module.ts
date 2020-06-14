import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from '../../ormconfig.js';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';

// todo .env 에서 설정 읽도록 만들기
//    synchronize 는 test 에서만 되도록 true 되도록 만들기
//    아니면 그냥 typeorm 의 외부 config를 사용해서 는거 고려하기


@Module({
	imports: [TypeOrmModule.forRoot(config), MorganModule.forRoot()],
	controllers: [AppController],
	providers: [
		AppService,
		// todo morgan module
		{
			provide: APP_INTERCEPTOR,
			useClass: MorganInterceptor('combined'),
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: MorganInterceptor('combined'),
		},
	],
})
export class AppModule {}
