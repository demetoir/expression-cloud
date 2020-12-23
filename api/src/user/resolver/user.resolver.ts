import {
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { IdArgs } from 'src/common';
import { UserSetting, UserSettingService } from 'src/user-setting';
import * as DataLoader from 'dataloader';
import { UserService } from '../service';
import { User } from '../model';
import { UpdateUserInputArgs, UpdateUserInputType } from './operations';

@Resolver(() => User)
export class UserResolver {
	private userSettingLoader: DataLoader<number, UserSetting, number>;

	constructor(
		private readonly userService: UserService,
		private readonly userSettingService: UserSettingService,
	) {
		this.userSettingLoader = new DataLoader(
			async (userIds: number[]): Promise<UserSetting[]> => {
				return this.userSettingService.findByUserIds(userIds);
			},
		);
	}

	@ResolveField(() => UserSetting, { name: 'setting' })
	async resolveSetting(@Parent() parent: User): Promise<UserSetting> {
		const a = await this.userSettingLoader.load(parent.id);

		return a;
	}

	@Query(() => [User], { name: 'getManyUser' })
	async getMany(): Promise<User[]> {
		const a = await this.userService.getMany();
		console.log(a);

		return a;
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
