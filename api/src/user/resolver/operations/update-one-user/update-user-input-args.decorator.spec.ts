import { UpdateUserInputArgs } from './update-user-input-args.decorator';

describe('UpdateUserInputArgs', () => {
	it('should defined', () => {
		expect(UpdateUserInputArgs).toBeDefined();
	});

	it('should return Mutation decorator', () => {
		const decorator = UpdateUserInputArgs();

		expect(decorator).toBeInstanceOf(Function);
	});

	it('should take arg options', () => {
		const options = {};

		const decorator = UpdateUserInputArgs(options);

		expect(decorator).toBeInstanceOf(Function);
	});
});
