import { Args, ArgsOptions } from '@nestjs/graphql';
import { CreateUserInputType } from '../input-types';

export function CreateUserInputArgs(options?: ArgsOptions): ParameterDecorator {
	return Args('input', {
		type: () => CreateUserInputType,
		...options,
	});
}
