import { Test, TestingModule } from '@nestjs/testing';
import { ScalarService } from './scalar.service';

describe('ScalarService', () => {
	let service: ScalarService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ScalarService],
		}).compile();

		service = module.get<ScalarService>(ScalarService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
