import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class JsonResponse<T> {
	@Field(() => GraphQLJSONObject)
	jsonObject: T | any;
}
