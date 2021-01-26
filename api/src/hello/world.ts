import { InputType, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { IdField, StringField } from 'src/common';
import { PKColumn, VarcharColumn } from 'src/common/typeorm';

@InputType('WorldInput')
@ObjectType('World')
@Entity()
export class World {
	@IdField()
	@PKColumn()
	id: number;

	// @Directive('@upper')
	@StringField()
	@VarcharColumn({
		name: 'name',
		length: 255,
		nullable: false,
	})
	name: string;
}
