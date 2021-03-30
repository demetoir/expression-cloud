import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export function TypeormRepositoryModule(
	entities: EntityClassOrSchema[],
): ClassDecorator {
	return Module({
		imports: [TypeOrmModule.forFeature(entities)],
		exports: [TypeOrmModule],
	});
}
