import { InputType, PartialType } from '@nestjs/graphql';
import { GQL_INPUT_TYPE_UPDATE_USER } from 'src/user/resolver/constants';
import { User } from 'src/user/model';

@InputType(GQL_INPUT_TYPE_UPDATE_USER)
export class UpdateUserInputType extends PartialType(User) {}
