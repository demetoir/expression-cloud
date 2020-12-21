import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vector } from '../model';
import { VectorRepository } from './vector.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Vector, VectorRepository])],
	exports: [TypeOrmModule],
})
export class VectorRepositoryModule {}
