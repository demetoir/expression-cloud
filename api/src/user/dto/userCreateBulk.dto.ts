import { UserEntity } from 'src/user/user.entity';
import { AbstractBaseDto } from 'src/common/abstractBaseDto';
import { UserCreateDto } from 'src/user/dto/userCreate.dto';
import { CreateManyDto } from '@nestjsx/crud';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateBulkDto extends AbstractBaseDto {
	@ApiProperty({
		type: UserCreateDto,
		isArray: true,
	})
	bulk: UserCreateDto[];

	static fromBody(body: any): UserCreateBulkDto {
		const dto = new UserCreateBulkDto();

		dto.bulk = body.bulk.map((x) => UserCreateDto.fromBody(x));

		return dto;
	}

	public toEntity(): CreateManyDto<UserEntity> {
		const entityList: UserEntity[] = this.bulk.map(
			(x): UserEntity => {
				return x.toEntity();
			},
		);

		return {
			bulk: entityList,
		};
	}
}
