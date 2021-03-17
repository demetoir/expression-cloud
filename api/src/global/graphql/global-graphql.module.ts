import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HasRoleDirective } from 'src/core/security/jwt-strategy/has-role.directive';
import { UpperCaseDirective } from 'src/core/security/jwt-strategy/upper.directive';

@Module({
	imports: [
		GraphQLModule.forRoot({
			debug: false,
			playground: true,
			installSubscriptionHandlers: true,
			autoSchemaFile: './schema.graphql',
			// bug: can not resolve union type if sortSchema is true this is nest graphql error
			// related with issue 144
			sortSchema: false,
			tracing: true,
			context: (context) => ({ ...context }),
			schemaDirectives: {
				hasRole: HasRoleDirective,
				upper: UpperCaseDirective,
			},
		}),
	],
})
export class GlobalGraphqlModule {}
