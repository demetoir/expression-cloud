import { Field, FieldOptions } from '@nestjs/graphql';
import { NonNegativeIntResolver } from 'graphql-scalars';

export function NonNegativeIntField(
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator {
	return Field(() => NonNegativeIntResolver, options);
}
