import { GetManyUserInputArgs } from './get-many-user-input-args.decorator';

describe('GetManyUserInputArgs', () => {
	it('should defined', () => {
		expect(GetManyUserInputArgs).toBeDefined();
	});

	it('should return Mutation decorator', () => {
		const decorator = GetManyUserInputArgs();

		expect(decorator).toBeInstanceOf(Function);
	});

	it('should take arg options', () => {
		const options = {};

		const decorator = GetManyUserInputArgs(options);

		expect(decorator).toBeInstanceOf(Function);
	});
});
