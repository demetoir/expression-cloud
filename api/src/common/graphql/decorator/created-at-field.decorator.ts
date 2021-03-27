import { Field, FieldOptions } from '@nestjs/graphql';
import { DateTimeScalar } from '../scalars';

export const CreatedAtField = (
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator => Field(() => DateTimeScalar, options);
