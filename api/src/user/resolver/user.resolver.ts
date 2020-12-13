import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../service';
import { User } from '../model';

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => User, { name: 'getOneUser' })
	async getOneById(): Promise<User> {
		return this.userService.getOneById(0);
	}
}
