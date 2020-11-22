import { Field, FieldOptions } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

export function StringField(
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator {
	return Field(() => GraphQLString, options);
}
