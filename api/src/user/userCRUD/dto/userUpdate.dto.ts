import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../common/model/entity/user/user.entity';
import { AbstractBaseDto } from '../../../common/abstractBaseDto';

export class UserUpdateDto extends AbstractBaseDto {
	@ApiProperty({})
	name: string;

	@ApiProperty({})
	email: string;

	@ApiProperty({})
	description: string;

	static fromBody(body: any): UserUpdateDto {
		const dto = new UserUpdateDto();

		dto.description = body.description;
		dto.email = body.email;
		dto.name = body.name;

		return dto;
	}

	public toEntity(): UserEntity {
		const user = new UserEntity();

		user.name = this.name;
		user.email = this.email;
		user.description = this.description;

		return user;
	}
}
