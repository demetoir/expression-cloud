import {
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { IdArgs } from 'src/common';
import { UserSetting, UserSettingDataLoader } from 'src/core/user/user-setting';
import { UserService } from '../service';
import { User } from '../model';
import { UpdateUserInputArgs, UpdateUserInputType } from './operations';

@Resolver(() => User)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		private readonly userSettingDataLoader: UserSettingDataLoader,
	) {}

	@ResolveField(() => UserSetting, { name: 'setting' })
	async resolveSetting(@Parent() parent: User): Promise<UserSetting> {
		return this.userSettingDataLoader.loadByUserId(parent.id);
	}

	@Query(() => [User], { name: 'getManyUser' })
	async getMany(): Promise<User[]> {
		return this.userService.getMany();
	}

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
