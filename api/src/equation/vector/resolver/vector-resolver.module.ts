import { Module } from '@nestjs/common';
import { VectorServiceModule } from 'src/equation/vector/service';
import { VectorResolver } from 'src/equation/vector/resolver/vector.resolver';

@Module({
	imports: [VectorServiceModule],
	providers: [VectorResolver],
	exports: [VectorResolver],
})
export class VectorResolverModule {}
