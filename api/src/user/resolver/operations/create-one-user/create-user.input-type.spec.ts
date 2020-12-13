import { CreateUserInputType } from './create-user.input-type';

describe('CreateUserInputType', () => {
	it('should be defined', () => {
		expect(CreateUserInputType).toBeDefined();
		expect(new CreateUserInputType()).toBeDefined();
	});

	describe('should define field', () => {
		const objectType = new CreateUserInputType();

		it('should prepare objectType', () => {
			expect(objectType).toBeDefined();
		});
	});
});
