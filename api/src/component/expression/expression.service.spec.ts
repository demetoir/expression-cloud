import { Test, TestingModule } from '@nestjs/testing';
import { ExpressionService } from './expression.service';

describe('ExpressionService', () => {
	let service: ExpressionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ExpressionService],
		}).compile();

		service = module.get<ExpressionService>(ExpressionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
