import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as ormConfig } from '../model/configLoader';

// todo .env 에서 설정 읽도록 만들기

@Module({
	imports: [TypeOrmModule.forRoot(ormConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
