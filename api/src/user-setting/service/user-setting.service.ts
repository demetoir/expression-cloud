import { Injectable } from '@nestjs/common';
import { UserSettingRepository } from '../repository';

@Injectable()
export class UserSettingService {
	constructor(
		private readonly userSettingRepository: UserSettingRepository,
	) {}
}
