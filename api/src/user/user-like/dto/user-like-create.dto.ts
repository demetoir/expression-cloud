import { IsNumber, IsPositive } from 'class-validator';
import { AbstractBaseDto } from '../../../common/abstractBaseDto';
import { UserLikeEntity } from '../user-like.entity';
import { plainToClass } from 'class-transformer';

export class UserLikeCreateDto extends AbstractBaseDto {
	@IsNumber()
	@IsPositive()
	fromUserId: number;

	@IsNumber()
	@IsPositive()
	toUserId: number;

	public static fromBody(body: unknown): AbstractBaseDto {
		return plainToClass(UserLikeCreateDto, body);
	}

	public toEntity(): UserLikeEntity {
		return plainToClass(UserLikeEntity, this);
	}
}
