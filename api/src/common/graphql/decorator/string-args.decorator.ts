import { Args, ArgsOptions } from '@nestjs/graphql';

export function StringArgs(options: ArgsOptions): ParameterDecorator {
	return Args(options);
}
