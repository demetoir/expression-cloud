import { Test, TestingModule } from '@nestjs/testing';
import { ExpressionController } from './expression.controller';

describe('Expression Controller', () => {
	let controller: ExpressionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ExpressionController],
		}).compile();

		controller = module.get<ExpressionController>(ExpressionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
