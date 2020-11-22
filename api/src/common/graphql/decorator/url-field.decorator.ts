import { Field, FieldOptions } from '@nestjs/graphql';
import { UrlScalar } from '../scalars';

export const URLField = (
	options?: FieldOptions,
): PropertyDecorator & MethodDecorator => Field(() => UrlScalar, options);
