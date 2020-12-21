import { Module } from '@nestjs/common';
import { DateTimeScalar } from 'src/common';
import { ExpressionService } from './expression.service';
import { ExpressionRepositoryModule } from '../repository';

@Module({
	imports: [ExpressionRepositoryModule, DateTimeScalar],
	providers: [ExpressionService],
	exports: [ExpressionService],
})
export class ExpressionServiceModule {}
