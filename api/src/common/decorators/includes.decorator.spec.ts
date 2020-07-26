import { _decorator, Includes } from './includes.decorator';

describe('ResourceId decorator', () => {
	it('should be declare', function () {
		expect(Includes).toBeDefined();
		expect(_decorator).toBeDefined();
	});

	// todo: 데코레이터 테스트시 interface 를 mock할 방법을 찾아야함
	it('should be send args (token, ctx)', function () {
		expect(false);
		// _decorator(token, executionContext);
	});

	it('should be parse resource id as number', function () {
		expect(false);
		// _decorator(token, executionContext);
	});

	it('should be throw error, if resource id is not number', function () {
		expect(false);
		// _decorator(token, executionContext);
	});
});
