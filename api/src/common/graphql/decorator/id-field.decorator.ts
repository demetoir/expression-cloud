import { Field, FieldOptions } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';

export function IdField(
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator {
	return Field(() => GraphQLID, options);
}
