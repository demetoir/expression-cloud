import { InputType } from '@nestjs/graphql';
import { StringField } from 'src/common';

@InputType()
export class BasicAuthInput {
	@StringField()
	userName: string;

	@StringField()
	password: string;
}
