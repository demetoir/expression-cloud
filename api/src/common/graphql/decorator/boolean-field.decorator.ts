import { Field, FieldOptions } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';

export function BooleanField(
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator {
	return Field(() => GraphQLBoolean, options);
}
