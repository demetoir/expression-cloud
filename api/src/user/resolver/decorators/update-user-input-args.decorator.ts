import { Args, ArgsOptions } from '@nestjs/graphql';
import { UpdateUserInputType } from '../input-types';

export function UpdateUserInputArgs(options?: ArgsOptions): ParameterDecorator {
	return Args('input', {
		type: () => UpdateUserInputType,
		...options,
	});
}
