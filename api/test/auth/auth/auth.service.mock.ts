export class MockAuthService {
	issueToken = jest.fn();

	refreshToken = jest.fn();

	revokeToken = jest.fn();
}
