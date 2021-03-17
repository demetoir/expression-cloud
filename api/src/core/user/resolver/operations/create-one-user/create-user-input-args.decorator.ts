import { Args, ArgsOptions } from '@nestjs/graphql';
import { CreateUserInputType } from 'src/core/user/resolver/operations/create-one-user/create-user.input-type';

export function CreateUserInputArgs(options?: ArgsOptions): ParameterDecorator {
	return Args('input', {
		type: () => CreateUserInputType,
		...options,
	});
}
