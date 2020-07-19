import { Test, TestingModule } from '@nestjs/testing';
import { VectorController } from './vector.controller';

describe('Vector Controller', () => {
	let controller: VectorController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VectorController],
		}).compile();

		controller = module.get<VectorController>(VectorController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
