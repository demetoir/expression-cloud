import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {User} from "./model/entity/user.entity"

const entities = [User];

// todo .env 에서 설정 읽도록 만들기
//    synchronize 는 test 에서만 되도록 true 되도록 만들기
//    아니면 그냥 typeorm 의 외부 config를 사용해서 는거 고려하기
@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: entities,
        synchronize: true,
    }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
