import { Controller, Post } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';

// TODO implement and test user controller
@Controller('/:id/actions')
export class UserActionController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	@Post('/like')
	async like(): Promise<string> {
		return 'like user';
	}

	@Post('/undo-like')
	async undoLike(): Promise<string> {
		return 'undo like user';
	}
}
