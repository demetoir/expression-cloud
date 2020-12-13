import { InputType } from '@nestjs/graphql';
import { GQL_INPUT_TYPE_UPDATE_USER } from '../constants';

@InputType(GQL_INPUT_TYPE_UPDATE_USER)
export class UpdateUserInputType {}
