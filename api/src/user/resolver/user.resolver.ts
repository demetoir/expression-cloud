import { Resolver } from '@nestjs/graphql';
import { UserService } from '../service';
import { User } from '../model';

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	async getOneById() {}

	async getMany() {}

	async getCount() {}

	async createOne() {}

	async updateOne() {}

	async deleteOne() {}
}
