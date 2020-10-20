import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';
import { AbstractBaseDto } from 'src/common/abstractBaseDto';
import { plainToClass } from 'class-transformer';

export class UserCreateDto extends AbstractBaseDto {
	@ApiProperty({
		required: true,
		default: 'name',
		example: 'name',
	})
	name: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	isAnonymous: boolean;

	static fromBody(body: any): UserCreateDto {
		return plainToClass(UserCreateDto, body);
	}

	public toEntity(): UserEntity {
		const user = plainToClass(UserEntity, this);

		return user;
	}
}
