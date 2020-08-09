import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../common/model/entity/user.entity';
import { AbstractBaseDto } from '../../../common/abstractBaseDto';
import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class UserCreateDto extends AbstractBaseDto {
	@IsString({ always: true })
	@MaxLength(100, { always: true })
	@ApiProperty({
		required: true,
		default: 'name',
		example: 'name',
	})
	name: string;

	@IsString({ always: true })
	@MaxLength(100, { always: true })
	@ApiProperty()
	email: string;

	@IsString({ always: true })
	@MaxLength(100, { always: true })
	@ApiProperty()
	description: string;

	@IsBoolean({ always: true })
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
