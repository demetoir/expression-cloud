import { Injectable } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';
import { UserRepository } from '../userRepository/user.repository';

@Injectable()
export class UserActionService {
	private logger: any;

	constructor(private readonly userRepository: UserRepository) {
		this.logger = logger;
	}

	async like(): Promise<string> {
		return 'like user';
	}

	async undoLike(): Promise<string> {
		return 'undo like user';
	}
}
