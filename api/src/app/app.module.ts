import { Module } from '@nestjs/common';
import { UserResolverModule } from 'src/user';
import { GlobalTypeormModule } from 'src/database';
import { GlobalConfigModule } from 'src/config';
import { ExpressionResolverModule } from 'src/expression';
import { VectorResolverModule } from 'src/vector';
import { GlobalGraphqlModule } from 'src/graphql';
import { JwtPassportModule } from 'src/auth/jwt-strategy';

@Module({
	imports: [
		GlobalTypeormModule,
		GlobalConfigModule,
		GlobalGraphqlModule,
		UserResolverModule,
		ExpressionResolverModule,
		VectorResolverModule,
		JwtPassportModule,
	],
})
export class AppModule {}
