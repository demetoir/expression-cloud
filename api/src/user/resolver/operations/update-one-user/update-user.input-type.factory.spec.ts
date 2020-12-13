import { UpdateUserInputType } from './update-user.input-type';
import { UpdateUserInputTypeFactory } from './update-user.input-type.factory';

describe('UpdateUserInputTypeFactory', () => {
	const factory = UpdateUserInputTypeFactory;

	it('should be defined', () => {
		expect(factory).toBeDefined();
	});

	describe('static method build', () => {
		it('should defined', () => {
			expect(factory.build).toBeDefined();
		});

		it('should return object type', () => {
			const user = factory.build();

			expect(user).toBeInstanceOf(UpdateUserInputType);
		});
	});
});
