import { Args, ArgsOptions } from '@nestjs/graphql';
import { UpdateUserInputType } from 'src/user/resolver/operations/update-one-user/update-user.input-type';

export function UpdateUserInputArgs(options?: ArgsOptions): ParameterDecorator {
	return Args('input', {
		type: () => UpdateUserInputType,
		...options,
	});
}
