import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as ormConfig } from '../common/model/configLoader';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CollectionModule } from '../collection/collection.module';
import { ExpressionModule } from '../expression/expression.module';
import { HistoryModule } from '../history/history.module';
import { NoticeModule } from '../notice/notice.module';
import { ScalarModule } from '../scalar/scalar.module';
import { TagModule } from '../tag/tag.module';
import { TeamModule } from '../team/team.module';
import { VectorModule } from '../vector/vector.module';
import { ImageModule } from '../image/image.module';

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
