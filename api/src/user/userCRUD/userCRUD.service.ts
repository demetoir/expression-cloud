import { Injectable } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';
import { Repository } from 'typeorm';
import { UserEntity } from '../../common/model/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserCRUDService {
	private logger: any;

	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: Repository<UserEntity>,
	) {
		this.logger = logger;
	}

	async getMany(queries) {
		// this.userRepository.get;
	}

	async getOne(id: number, queries) {
		return this.userRepository.findOne(id);
	}

	async createOne(body: any) {
		const user = new UserEntity();

		user.name = body.name;
		user.description = body.description;
		user.email = body.email;

		return this.userRepository.create(user);
	}

	async updateOne(id, body) {}

	async updateOnePartial(id, body) {}

	async deleteOne(id) {}
}
