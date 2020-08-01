import { Controller, Post } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';
import { UserActionService } from './userAction.service';

// TODO implement and test user controller
@Controller('/:id/actions')
export class UserActionController {
	private logger: any;

	constructor(private readonly userActionService: UserActionService) {
		this.logger = logger;
	}

	@Post('/like')
	async like(): Promise<string> {
		return this.userActionService.like();
	}

	@Post('/undo-like')
	async undoLike(): Promise<string> {
		return this.userActionService.undoLike();
	}
}
