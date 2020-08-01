import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../common/model/entity/user.entity';

export class UserCreateDto {
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

	constructor({ name, email, description, isAnonymous }) {
		this.email = email;
		this.name = name;
		this.description = description;
		this.isAnonymous = isAnonymous;
	}

	static fromBody(body: any): UserCreateDto {
		return new UserCreateDto(body);
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
