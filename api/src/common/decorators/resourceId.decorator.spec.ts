import { mock } from 'jest-mock-extended';
import { ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { expectShouldNotCallThis } from 'test/lib/helper/jestHelper';
import { ResourceIdTypeException } from '../exceptions/resourceIdTypeException';
import { decorator, ResourceNumberId } from './resourceId.decorator';

function getExecutionContextMock(request): ExecutionContext {
	const httpArgumentHost = mock<HttpArgumentsHost>();
	// noinspection TypeScriptUnresolvedFunction
	httpArgumentHost.getRequest.mockReturnValue(request);

	const executionContext = mock<ExecutionContext>();

	executionContext.switchToHttp.mockReturnValue(httpArgumentHost);

	return executionContext;
}

describe('ResourceId decorator', () => {
	it('should be declare', function () {
		expect(ResourceNumberId).toBeDefined();
		expect(decorator);
	});

	it('should be send args (token, ctx)', function () {
		const token = 'id';
		const request = {
			params: {
				id: 1,
			},
		};

		const context = getExecutionContextMock(request);
		decorator(token, context);
	});

	it('should return number', function () {
		const token = 'id';
		const request = {
			params: {
				id: 1,
			},
		};

		const context = getExecutionContextMock(request);
		const result = decorator(token, context);

		expect(typeof result).toEqual('number');
	});

	it('should be throw error, if token is not included in params', function () {
		const token = 'id';
		const request = {
			params: {},
		};
		const context = getExecutionContextMock(request);

		try {
			decorator(token, context);

			expectShouldNotCallThis();
		} catch (e) {
			expect(e).toBeInstanceOf(ResourceIdTypeException);
		}
	});

	it('should be throw error, if resourceId is not type of number', function () {
		const token = 'id';
		const request = {
			params: { id: 'fff' },
		};
		const context = getExecutionContextMock(request);

		try {
			decorator(token, context);

			expectShouldNotCallThis();
		} catch (e) {
			expect(e).toBeInstanceOf(ResourceIdTypeException);
		}
	});

	it('should be throw error, if token is undefined', function () {
		const token = undefined;
		const request = {
			params: { id: 'fff' },
		};
		const context = getExecutionContextMock(request);

		try {
			decorator(token, context);

			expectShouldNotCallThis();
		} catch (e) {
			expect(e).toBeInstanceOf(TypeError);
		}
	});

	it('should be throw error, if token is null', function () {
		const token = null;
		const request = {
			params: { id: 'fff' },
		};
		const context = getExecutionContextMock(request);

		try {
			decorator(token, context);

			expectShouldNotCallThis();
		} catch (e) {
			expect(e).toBeInstanceOf(TypeError);
		}
	});
});
