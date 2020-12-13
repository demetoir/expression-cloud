import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../service';
import { User } from '../model';

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query((returns) => User)
	async getOneById(): Promise<User> {
		const user = new User();
		user.id = 1;
		user.description = '23e';
		user.email = 'email';
		user.forkedCount = 0;
		user.isAnonymous = false;
		user.likedCount = 0;

		return user;
	}

	async getMany() {}

	async getCount() {}

	async createOne() {}

	async updateOne() {}

	async deleteOne() {}
}
