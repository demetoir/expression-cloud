import { InputType, ObjectType } from '@nestjs/graphql';
import { StringField } from 'src/common';

export const GQL_INPUT_TYPE_JWT_RESPONSE = 'JWTResponseInput';
export const GQL_OBJECT_TYPE_JWT_RESPONSE = 'JWTResponse';

@InputType(GQL_INPUT_TYPE_JWT_RESPONSE)
@ObjectType(GQL_OBJECT_TYPE_JWT_RESPONSE)
export class JWTResponse {
	@StringField()
	accessToken: string;

	@StringField()
	refreshToken: string;

	@StringField()
	tokenType: string;
}
