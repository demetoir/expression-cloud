import { Args } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';

export function IdArgs(): ParameterDecorator {
	return Args('id', { nullable: false, type: () => GraphQLID });
}
