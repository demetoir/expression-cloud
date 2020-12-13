import { CreateUserInputArgs } from './create-user-input-args.decorator';

describe('CreateUserInputArgs', () => {
	it('should defined', () => {
		expect(CreateUserInputArgs).toBeDefined();
	});

	it('should return Mutation decorator', () => {
		const decorator = CreateUserInputArgs();

		expect(decorator).toBeInstanceOf(Function);
	});

	it('should take arg options', () => {
		const options = {};

		const decorator = CreateUserInputArgs(options);

		expect(decorator).toBeInstanceOf(Function);
	});
});
