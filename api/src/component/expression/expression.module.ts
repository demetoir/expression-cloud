import { Module } from '@nestjs/common';
import { ExpressionController } from './expression.controller';
import { ExpressionService } from './expression.service';

@Module({
	controllers: [ExpressionController],
	providers: [ExpressionService],
})
export class ExpressionModule {}
