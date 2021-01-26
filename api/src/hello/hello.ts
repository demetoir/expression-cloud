import { Entity } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IdField, PKColumn, StringField } from 'src/common';
import { VarcharColumn } from 'src/common/typeorm';
import { World } from 'src/hello/world';
import { RoleName } from 'src/security';
import { HasRole } from 'src/security/jwt-strategy/has-role.decorator';

@InputType('HelloInput')
@ObjectType('Hello')
@Entity()
export class Hello {
	@IdField()
	@PKColumn()
	id: number;

	@HasRole(RoleName.user, RoleName.admin)
	@StringField({
		description: 'this has role as user and admin only',
	})
	@VarcharColumn({
		name: 'name',
		length: 255,
		nullable: false,
	})
	name: string;

	@Field(() => [World])
	world: World[];
}
