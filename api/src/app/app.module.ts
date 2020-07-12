import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as ormConfig } from '../model/configLoader';
import { UserModule } from '../component/user/user.module';
import { AuthModule } from '../component/auth/auth.module';
import { CollectionModule } from '../component/collection/collection.module';
import { ExpressionModule } from '../component/expression/expression.module';
import { HistoryModule } from '../component/history/history.module';
import { NoticeModule } from '../component/notice/notice.module';
import { ScalarModule } from '../component/scalar/scalar.module';
import { TagModule } from '../component/tag/tag.module';
import { TeamModule } from '../component/team/team.module';
import { VectorModule } from '../component/vector/vector.module';
import { ImageModule } from '../component/image/image.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(ormConfig),
		UserModule,
		AuthModule,
		CollectionModule,
		ExpressionModule,
		HistoryModule,
		NoticeModule,
		ScalarModule,
		TagModule,
		TeamModule,
		VectorModule,
		ImageModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
