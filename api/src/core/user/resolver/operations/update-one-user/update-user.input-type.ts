import { InputType, PartialType } from '@nestjs/graphql';
import { GQL_INPUT_TYPE_UPDATE_USER } from '../../constants';
import { User } from '../../../model';

@InputType(GQL_INPUT_TYPE_UPDATE_USER)
export class UpdateUserInputType extends PartialType(User) {}
