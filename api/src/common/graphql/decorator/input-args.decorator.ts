import { Args } from '@nestjs/graphql';
import { PipeTransform, Type } from '@nestjs/common';
import { ArgsOptions } from '@nestjs/graphql/dist/decorators/args.decorator';

export function InputArgs(
	type: any,
	options?: ArgsOptions,
	...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
	return Args('input', { type: () => type, ...options }, ...pipes);
}
