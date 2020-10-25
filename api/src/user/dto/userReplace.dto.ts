import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/model/user.entity';
import { AbstractBaseDto } from 'src/common/abstractBaseDto';
import { plainToClass } from 'class-transformer';

export class UserReplaceDto extends AbstractBaseDto {
	@ApiProperty({})
	name: string;

	@ApiProperty({})
	email: string;

	@ApiProperty({})
	description: string;

	static fromBody(body: any): UserReplaceDto {
		return plainToClass(UserReplaceDto, body);
	}

	public toEntity(): UserEntity {
		return plainToClass(UserEntity, this);
	}
}
