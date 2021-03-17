import { InputType } from '@nestjs/graphql';
import { GQL_INPUT_TYPE_CREATE_USER } from 'src/core/user/resolver/constants';

@InputType(GQL_INPUT_TYPE_CREATE_USER)
export class CreateUserInputType {}
