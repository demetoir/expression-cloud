import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as ormConfig } from '../../ormconfig';

// todo .env 에서 설정 읽도록 만들기
// todo  아니면 그냥 typeorm 의 외부 config를 사용해서 는거 고려하기

@Module({
	imports: [TypeOrmModule.forRoot(ormConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
