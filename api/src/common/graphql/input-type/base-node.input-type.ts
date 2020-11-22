import { Field, InputType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';

export const GQL_INPUT_TYPE_BASE_NODE_INPUT = 'BaseNodeInput';

@InputType(GQL_INPUT_TYPE_BASE_NODE_INPUT, { isAbstract: true })
export class BaseNodeInputType {
	@Field(() => GraphQLID)
	id: string;
}
