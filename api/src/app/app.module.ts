import { Module } from '@nestjs/common';
import { UserResolverModule } from 'src/user/user';
import { GlobalConfigModule } from 'src/config';
import { ExpressionResolverModule } from 'src/equation/expression';
import { VectorResolverModule } from 'src/equation/vector';
import { GlobalTypeormModule } from 'src/common/database';
import { GlobalGraphqlModule } from 'src/common/graphql/global-graphql';

@Module({
	imports: [
		GlobalTypeormModule,
		GlobalConfigModule,
		GlobalGraphqlModule,
		UserResolverModule,
		ExpressionResolverModule,
		VectorResolverModule,
	],
})
export class AppModule {}
