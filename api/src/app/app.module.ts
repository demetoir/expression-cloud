import { Module } from '@nestjs/common';
import { GlobalConfigModule } from 'src/config';
import { GlobalTypeormModule } from '../common';
import { GlobalGraphqlModule } from '../global/graphql';
import { UserResolverModule } from '../core/user/resolver/user-resolver.module';
import { ExpressionResolverModule, VectorResolverModule } from '../core';

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
