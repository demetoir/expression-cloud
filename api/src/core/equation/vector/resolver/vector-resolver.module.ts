import { Module } from '@nestjs/common';
import { VectorServiceModule } from 'src/core/equation/vector/service';
import { VectorResolver } from 'src/core/equation/vector/resolver/vector.resolver';

@Module({
	imports: [VectorServiceModule],
	providers: [VectorResolver],
	exports: [VectorResolver],
})
export class VectorResolverModule {}
