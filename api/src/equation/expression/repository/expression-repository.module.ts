import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expression } from '../model';
import { ExpressionRepository } from './expression.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Expression, ExpressionRepository])],
	exports: [TypeOrmModule],
})
export class ExpressionRepositoryModule {}
