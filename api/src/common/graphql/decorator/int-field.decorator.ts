import { Field, FieldOptions } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql';

export function IntField(
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator {
	return Field(() => GraphQLInt, options);
}
