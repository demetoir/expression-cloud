import { Field, FieldOptions } from '@nestjs/graphql';
import { UUIDScalar } from '../scalars';

export const UUIDFiled = (
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator => Field(() => UUIDScalar, options);
