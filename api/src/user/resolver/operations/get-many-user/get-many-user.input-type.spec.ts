import { GetManyUserInputType } from './get-many-user.input-type';

describe('GetManyUserInputType', () => {
	it('should be defined', () => {
		expect(GetManyUserInputType).toBeDefined();
		expect(new GetManyUserInputType()).toBeDefined();
	});

	describe('should define field', () => {
		const objectType = new GetManyUserInputType();

		it('should prepare objectType', () => {
			expect(objectType).toBeDefined();
		});
	});
});
