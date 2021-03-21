import { Module } from '@nestjs/common';
import {
	GlobalConfigModule,
	GlobalGraphqlModule,
	GlobalTypeormModule,
} from '../global';

@Module({
	imports: [
		GlobalTypeormModule,
		GlobalConfigModule,
		GlobalGraphqlModule,
		// UserResolverModule,
		// ExpressionResolverModule,
		// VectorResolverModule,
	],
})
export class AppModule {}
