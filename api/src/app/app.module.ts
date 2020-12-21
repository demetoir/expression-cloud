import { Module } from '@nestjs/common';
import { UserResolverModule } from 'src/user';
import { GlobalTypeormModule } from 'src/database';
import { GlobalConfigModule } from 'src/config';
import { ExpressionResolverModule } from 'src/expression';
import { VectorResolverModule } from 'src/vector';
import { GlobalGraphqlModule } from 'src/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		GlobalTypeormModule,
		GlobalConfigModule,
		GlobalGraphqlModule,
		UserResolverModule,
		ExpressionResolverModule,
		VectorResolverModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
