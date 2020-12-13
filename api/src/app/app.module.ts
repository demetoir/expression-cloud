import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalTypeormModule } from '../database/global-typeorm/global-typeorm.module';
import { GlobalConfigModule } from '../config/globalConfig.module';
import { GlobalGraphqlModule } from '../graphql/global-graphql/global-graphql.module';
import { UserResolverModule } from 'src/user';

@Module({
	imports: [
		GlobalTypeormModule,
		GlobalConfigModule,
		GlobalGraphqlModule,
		UserResolverModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
