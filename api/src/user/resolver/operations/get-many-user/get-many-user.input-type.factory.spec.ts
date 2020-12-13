import { GetManyUserInputType } from './get-many-user.input-type';
import { GetManyUserInputTypeFactory } from './get-many-user.input-type.factory';

describe('GetManyUserInputTypeFactory', () => {
	const factory = GetManyUserInputTypeFactory;

	it('should be defined', () => {
		expect(factory).toBeDefined();
	});

	describe('static method build', () => {
		it('should defined', () => {
			expect(factory.build).toBeDefined();
		});

		it('should return object type', () => {
			const user = factory.build();

			expect(user).toBeInstanceOf(GetManyUserInputType);
		});
	});
});
