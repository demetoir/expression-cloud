import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository';
import { User } from '../model';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getOneById(id: number): Promise<User> {
		const user = new User();
		user.id = 1;
		user.description = '23e';
		user.email = 'email';
		user.forkedCount = 0;
		user.isAnonymous = false;
		user.likedCount = 0;

		return user;
	}
}
