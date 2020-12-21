import { Test, TestingModule } from '@nestjs/testing';
import { VectorService } from './vector.service';

describe('VectorService', () => {
	let service: VectorService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [VectorService],
		}).compile();

		service = module.get<VectorService>(VectorService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
