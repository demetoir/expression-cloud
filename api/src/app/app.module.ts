import { Module } from '@nestjs/common';
import { UserResolverModule } from 'src/user';
import { GlobalConfigModule } from 'src/config';
import { ExpressionResolverModule } from 'src/expression';
import { VectorResolverModule } from 'src/vector';
import { JwtPassportModule } from 'src/auth/jwt-strategy';
import { AuthResolverModule } from 'src/auth/auth-resolver.module';
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
		JwtPassportModule,
		AuthResolverModule,
	],
})
export class AppModule {}
