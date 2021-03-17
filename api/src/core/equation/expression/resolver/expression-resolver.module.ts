import { Module } from '@nestjs/common';
import { ExpressionResolver } from 'src/core/equation/expression/resolver/expression.resolver';
import { ExpressionServiceModule } from 'src/core/equation/expression/service';

@Module({
	imports: [ExpressionServiceModule],
	providers: [ExpressionResolver],
	exports: [ExpressionResolver],
})
export class ExpressionResolverModule {}
