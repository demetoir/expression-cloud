import { Module } from '@nestjs/common';
import {
	GlobalConfigModule,
	GlobalGraphqlModule,
	GlobalTypeormModule,
} from '../global';
import {
	ExpressionResolverModule,
	UserResolverModule,
	VectorResolverModule,
} from '../core';

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
