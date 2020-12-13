import { UpdateUserInputType } from './update-user.input-type';

describe('UpdateUserInputType', () => {
	it('should be defined', () => {
		expect(UpdateUserInputType).toBeDefined();
		expect(new UpdateUserInputType()).toBeDefined();
	});

	describe('should define field', () => {
		const objectType = new UpdateUserInputType();

		it('should prepare objectType', () => {
			expect(objectType).toBeDefined();
		});
	});
});
