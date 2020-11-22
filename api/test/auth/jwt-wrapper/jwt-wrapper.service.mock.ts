export class MockJwtWrapperService {
	verify = jest.fn();

	isExpired = jest.fn();

	sign = jest.fn();
}
