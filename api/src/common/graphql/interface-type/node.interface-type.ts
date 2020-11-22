import { InterfaceType } from '@nestjs/graphql';
import { IdField } from '../decorator';

export const GQL_INTERFACE_TYPE_NODE = 'Node';

@InterfaceType(GQL_INTERFACE_TYPE_NODE, {
	description: 'base node interface type',
})
export abstract class NodeInterfaceType {
	@IdField()
	id: string;
}
