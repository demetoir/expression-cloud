import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { UserSettingRepository } from '../repository';
import { UserSetting } from '../model';

@Injectable()
export class UserSettingService {
	constructor(
		private readonly userSettingRepository: UserSettingRepository,
	) {}

	async findByIds(ids: number[]): Promise<UserSetting[]> {
		return this.userSettingRepository.findByIds(ids);
	}

	async findByUserIds(userIds: number[]): Promise<UserSetting[]> {
		console.log('findByUserIds');

		const a = await this.userSettingRepository.find({
			where: {
				userId: In(userIds),
			},
		});

		return a;
	}
}
