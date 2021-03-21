import { InputType, PartialType } from '@nestjs/graphql';
import { User } from '../../../model';
import { GQL_INPUT_TYPE_UPDATE_USER } from '../../constants';

@InputType(GQL_INPUT_TYPE_UPDATE_USER)
export class UpdateUserInputType extends PartialType(User) {}
