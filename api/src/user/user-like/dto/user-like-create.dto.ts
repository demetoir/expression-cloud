import { IsNumber } from 'class-validator';

export class UserLikeCreateDto {
	@IsNumber()
	fromUserId: number;

	@IsNumber()
	toUserId: number;
}
