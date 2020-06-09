import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from "../../ormconfig.js"

// todo .env 에서 설정 읽도록 만들기
//    synchronize 는 test 에서만 되도록 true 되도록 만들기
//    아니면 그냥 typeorm 의 외부 config를 사용해서 는거 고려하기

@Module({
	imports: [
		TypeOrmModule.forRoot(ormconfig),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
