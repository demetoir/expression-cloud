import { Module } from '@nestjs/common';
import { VectorServiceModule } from 'src/vector/service';
import { VectorResolver } from 'src/vector/resolver/vector.resolver';

@Module({
	imports: [VectorServiceModule],
	providers: [VectorResolver],
	exports: [VectorResolver],
})
export class VectorResolverModule {}
