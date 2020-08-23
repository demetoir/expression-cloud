import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../common/model/entity/user/user.entity';
import { AbstractBaseDto } from '../../../common/abstractBaseDto';

export class UserReplaceDto extends AbstractBaseDto {
	@ApiProperty({})
	name: string;

	@ApiProperty({})
	email: string;

	@ApiProperty({})
	description: string;

	static fromBody(body: any): UserReplaceDto {
		const dto = new UserReplaceDto();

		dto.description = body.description;
		``;
		dto.name = body.name;
		dto.email = body.email;

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
