import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from '../../ormconfig.js';

// todo migration , nest.js start 에서 각각 orm config를 임포트 하는 방식이 다르다
//      마이그레이션은 통으로 export 해야하고, nest 에서는 객체 거쳐서 해야한다..
// todo .env 에서 설정 읽도록 만들기
// todo  아니면 그냥 typeorm 의 외부 config를 사용해서 는거 고려하기

@Module({
	imports: [TypeOrmModule.forRoot(ormConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
