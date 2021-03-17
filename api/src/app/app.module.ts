import { Module } from '@nestjs/common';
import { UserResolverModule } from 'src/core/user/user';
import { GlobalConfigModule } from 'src/config';
import { ExpressionResolverModule } from 'src/core/equation/expression';
import { VectorResolverModule } from 'src/core/equation/vector';
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
