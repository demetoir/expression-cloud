import { ObjectType } from '@nestjs/graphql';
import { StringField } from 'src/common';

@ObjectType()
export class WhoAmI {
	@StringField()
	message: string;
}
