import { Module } from '@nestjs/common';
import { VectorRepositoryModule } from '../repository';
import { VectorService } from './vector.service';

@Module({
	imports: [VectorRepositoryModule],
	providers: [VectorService],
	exports: [VectorService],
})
export class VectorServiceModule {}
