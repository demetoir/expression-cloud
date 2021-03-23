import { UserFactory } from './user.factory';

describe('user factory', () => {
	it('should build random user', async function () {
		const user = UserFactory.build();

		expect(user).toBeDefined();
	});
});
