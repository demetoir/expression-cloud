import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';

export class UpperCaseDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(
		field: GraphQLField<any, any>,
	): GraphQLField<any, any> | void | null {
		const { resolve = defaultFieldResolver } = field;
		// eslint-disable-next-line no-param-reassign
		field.resolve = async function (...args) {
			const result = await resolve.apply(this, args);

			if (typeof result === 'string') {
				return result.toUpperCase();
			}

			return result;
		};
	}
}
