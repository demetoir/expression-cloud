import { Test, TestingModule } from '@nestjs/testing';
import { ScalarController } from './scalar.controller';

describe('Scalar Controller', () => {
	let controller: ScalarController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ScalarController],
		}).compile();

		controller = module.get<ScalarController>(ScalarController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
