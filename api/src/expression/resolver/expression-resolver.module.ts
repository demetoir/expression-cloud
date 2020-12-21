import { Module } from '@nestjs/common';
import { ExpressionResolver } from 'src/expression/resolver/expression.resolver';
import { ExpressionServiceModule } from 'src/expression/service';

@Module({
	imports: [ExpressionServiceModule],
	providers: [ExpressionResolver],
	exports: [ExpressionResolver],
})
export class ExpressionResolverModule {}
