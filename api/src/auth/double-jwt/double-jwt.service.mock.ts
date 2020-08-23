export class MockDoubleJWTService {
	issueToken = jest.fn();

	refreshToken = jest.fn();

	revokeToken = jest.fn();

	verifyToken = jest.fn();

	verifyPayload = jest.fn();
}
