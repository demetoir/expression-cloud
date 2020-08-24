import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user.entity';
import { AbstractBaseDto } from '../../../common/abstractBaseDto';

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
		const dto = new UserCreateDto();

		dto.email = body.email;
		dto.name = body.name;
		dto.description = body.description;
		dto.isAnonymous = body.isAnonymous;

		return dto;
	}

	public toEntity(): UserEntity {
		const user = new UserEntity();
		user.name = this.name;
		user.email = this.email;
		user.description = this.description;
		user.isAnonymous = this.isAnonymous;

		return user;
	}
}
