import { InterfaceType } from '@nestjs/graphql';
import { DateTimeField } from '../decorator';

export const GQL_INTERFACE_TYPE_TIMESTAMP = 'Timestamp';

@InterfaceType(GQL_INTERFACE_TYPE_TIMESTAMP, {
	description: 'base node interface type',
})
export abstract class TimestampInterfaceType {
	@DateTimeField()
	createdAt: Date;

	@DateTimeField()
	updatedAt: Date;

	@DateTimeField({ nullable: true })
	deletedAt?: Date;
}
