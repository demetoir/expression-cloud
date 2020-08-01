import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../common/model/entity/user.entity';

export class UserReplaceDto {
	// id: number;

	@ApiProperty({})
	name: string;

	@ApiProperty({})
	email: string;

	@ApiProperty({})
	description: string;
	//
	// constructor({ name, email, description, id }) {
	// 	this.email = email;
	// 	this.name = name;
	// 	this.description = description;
	// 	// this.id = id;
	// }
	//
	static fromBody(body: any, id: number): UserReplaceDto {
		const dto = new UserReplaceDto();

		dto.description = body.description;
		dto.name = body.name;
		dto.email = dto.email;

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
