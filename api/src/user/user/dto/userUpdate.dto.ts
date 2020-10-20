import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';
import { AbstractBaseDto } from 'src/common/abstractBaseDto';
import { plainToClass } from 'class-transformer';

export class UserUpdateDto extends AbstractBaseDto {
	@ApiProperty({})
	name: string;

	@ApiProperty({})
	email: string;

	@ApiProperty({})
	description: string;

	static fromBody(body: unknown): UserUpdateDto {
		return plainToClass(UserUpdateDto, body);
	}

	public toEntity(): UserEntity {
		return plainToClass(UserEntity, this);
	}
}
