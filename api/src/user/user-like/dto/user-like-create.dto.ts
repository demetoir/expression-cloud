import { IsNumber, IsPositive } from 'class-validator';

export class UserLikeCreateDto {
	@IsNumber()
	@IsPositive()
	fromUserId: number;

	@IsNumber()
	@IsPositive()
	toUserId: number;
}
