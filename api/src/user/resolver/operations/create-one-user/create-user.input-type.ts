import { InputType, PartialType } from '@nestjs/graphql';
import { User } from 'src/user/model';
import { GQL_INPUT_TYPE_CREATE_USER } from 'src/user/resolver/constants';

@InputType(GQL_INPUT_TYPE_CREATE_USER)
export class CreateUserInputType extends PartialType(User) {}
