import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { IdArgs } from 'src/common';
import { UserService } from '../service';
import { User } from '../model';
import { UpdateUserInputArgs, UpdateUserInputType } from './operations';

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => User, { name: 'getOneUser' })
	async getOneById(): Promise<User> {
		return this.userService.getOneById(0);
	}

	@Mutation(() => User, { name: 'updateOneUser' })
	async updateOneById(
		@IdArgs() id: number,
		@UpdateUserInputArgs()
		input: UpdateUserInputType,
	): Promise<User> {
		return this.userService.updateOneById(id, input);
	}
}
