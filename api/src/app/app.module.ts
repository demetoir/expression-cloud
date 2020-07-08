import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as ormConfig } from '../model/configLoader';
import { UserModule } from '../component/user/user.module';
import { AuthModule } from '../component/auth/auth.module';

@Module({
	imports: [TypeOrmModule.forRoot(ormConfig), UserModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
