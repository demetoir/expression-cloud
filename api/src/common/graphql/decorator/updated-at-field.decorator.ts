import { Field, FieldOptions } from '@nestjs/graphql';
import { DateTimeScalar } from '../scalars';

export const UpdatedAtField = (
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator => Field(() => DateTimeScalar, options);
