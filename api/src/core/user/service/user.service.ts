import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository';
import { User } from '../model';
import { UpdateUserInputType } from '../resolver/operations';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getOneById(id: number): Promise<User> {
		const user = new User();
		user.id = 1;

		return user;
	}

	async updateOneById(id: number, input: UpdateUserInputType): Promise<User> {
		const user = new User();
		user.id = id;

		return user;
	}

	async getMany(): Promise<User[]> {
		return this.userRepository.find();
	}
}
