import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { CollectionModule } from '../collection/collection.module';
import { ExpressionModule } from '../expression/expression/expression.module';
import { HistoryModule } from '../history/history.module';
import { NoticeModule } from '../notice/notice.module';
import { ScalarModule } from '../scalar/scalar.module';
import { TagModule } from '../tag/tag.module';
import { TeamModule } from '../team/team.module';
import { VectorModule } from '../vector/vector.module';
import { ImageModule } from '../image/image.module';
import { GlobalTypeOrmModule } from '../database/GlobalTypeOrm.module';
import { GlobalConfigModule } from '../config/globalConfig.module';
import { UserModule } from '../user/user/user.module';

@Module({
	imports: [
		GlobalTypeOrmModule,
		GlobalConfigModule,
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
