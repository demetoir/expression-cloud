import { ObjectType } from '@nestjs/graphql';
import { IntField, StringField } from '../decorator';

export const GQL_OBJECT_TYPE_ERROR_RESPONSE = 'ErrorResponse';

@ObjectType(GQL_OBJECT_TYPE_ERROR_RESPONSE)
export class ErrorResponseObjectType {
	@IntField()
	code: number;

	@StringField()
	error: string;

	@StringField()
	message: string;
}
