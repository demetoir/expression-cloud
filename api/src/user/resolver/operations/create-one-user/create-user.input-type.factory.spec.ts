import { CreateUserInputType } from './create-user.input-type';
import { CreateUserInputTypeFactory } from './create-user.input-type.factory';

describe('CreateUserInputTypeFactory', () => {
	const factory = CreateUserInputTypeFactory;

	it('should be defined', () => {
		expect(factory).toBeDefined();
	});

	describe('static method build', () => {
		it('should defined', () => {
			expect(factory.build).toBeDefined();
		});

		it('should return object type', () => {
			const user = factory.build();

			expect(user).toBeInstanceOf(CreateUserInputType);
		});
	});
});
