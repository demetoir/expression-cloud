import { Field, FieldOptions } from '@nestjs/graphql';
import { GraphQLFloat } from 'graphql';

export function FloatField(
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator {
	return Field(() => GraphQLFloat, options);
}
