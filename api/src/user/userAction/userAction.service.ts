import { Injectable } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';

@Injectable()
export class UserActionService {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	async like() {}

	async undoLike() {}
}
