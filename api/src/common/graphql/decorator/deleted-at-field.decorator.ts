import { Field, FieldOptions } from '@nestjs/graphql';
import { DateTimeScalar } from '../scalars';

export const DeletedAtField = (
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator => Field(() => DateTimeScalar, options);
