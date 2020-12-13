import { InputType } from '@nestjs/graphql';
import { GQL_INPUT_TYPE_GET_MANY_USER } from 'src/user/resolver/constants';

@InputType(GQL_INPUT_TYPE_GET_MANY_USER)
export class GetManyUserInputType {}
