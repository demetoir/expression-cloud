import { Args, ArgsOptions } from '@nestjs/graphql';
import { GetManyUserInputType } from '../input-types';

export function GetManyUserInputArgs(
	options?: ArgsOptions,
): ParameterDecorator {
	return Args('input', {
		type: () => GetManyUserInputType,
		...options,
	});
}
