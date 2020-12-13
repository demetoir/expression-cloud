import { Args, ArgsOptions } from '@nestjs/graphql';
import { GetManyUserInputType } from './get-many-user.input-type';

export function GetManyUserInputArgs(
	options?: ArgsOptions,
): ParameterDecorator {
	return Args('input', {
		type: () => GetManyUserInputType,
		...options,
	});
}
