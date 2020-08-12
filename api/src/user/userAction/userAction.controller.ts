import { Body, Controller, Param, Post } from '@nestjs/common';
import { logger } from '../../common/libs/winstonToolkit';
import { UserActionService } from './userAction.service';
import { UndoLikeActionDto } from './dto/undoLikeAction.dto';
import { LikeActionDto } from './dto/likeAction.dto';
import { ApiTags } from '@nestjs/swagger';

// TODO implement and test user controller

@ApiTags('User')
@Controller('v1/users/:id/actions')
export class UserActionController {
	private logger: any;

	constructor(private readonly userActionService: UserActionService) {
		this.logger = logger;
	}

	@Post('/like')
	async like(
		@Param('id') toUserId: number,
		@Body() dto: LikeActionDto,
	): Promise<string> {
		return this.userActionService.like(toUserId, dto);
	}

	@Post('/undo-like')
	async undoLike(
		@Param('id') toUserId: number,
		@Body() dto: UndoLikeActionDto,
	): Promise<string> {
		return this.userActionService.undoLike(toUserId, dto);
	}
}
