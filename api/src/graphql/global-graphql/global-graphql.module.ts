import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

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
		}),
	],
})
export class GlobalGraphqlModule {}
