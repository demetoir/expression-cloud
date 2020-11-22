import { ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { mock } from 'jest-mock-extended';
import { decorator, Fields } from './fields.decorator';

function getExecutionContextMock(request): ExecutionContext {
	const httpArgumentHost = mock<HttpArgumentsHost>();
	// noinspection TypeScriptUnresolvedFunction
	httpArgumentHost.getRequest.mockReturnValue(request);

	const executionContext = mock<ExecutionContext>();

	executionContext.switchToHttp.mockReturnValue(httpArgumentHost);

	return executionContext;
}

describe('fields param decorator', () => {
	it('should be declare', function () {
		expect(Fields).toBeDefined();
		expect(decorator).toBeDefined();
	});

	it('should be send args (data, ctx)', function () {
		const request = {
			query: {
				fields: '12,1231,23',
			},
		};

		const context = getExecutionContextMock(request);
		const result = decorator(null, context);

		expect(result).toBeInstanceOf(Array);
	});

	it('should be return array type', function () {
		const request = {
			query: {
				fields: '12,1231,23',
			},
		};

		const context = getExecutionContextMock(request);
		const result = decorator(null, context);

		expect(result).toBeInstanceOf(Array);
	});

	it('should be parse fields', function () {
		const request = {
			query: {
				fields: 'a,b,c',
			},
		};

		const context = getExecutionContextMock(request);
		const result = decorator(null, context);

		expect(result).toStrictEqual(['a', 'b', 'c']);
	});

	it('should be empty array if fields not in query', function () {
		const request = {
			query: {},
		};

		const context = getExecutionContextMock(request);
		const result = decorator(null, context);

		expect(result).toStrictEqual([]);
	});

	it('should be ignore empty string', function () {
		const request = {
			query: { fields: '11,,,,5&&,' },
		};

		const context = getExecutionContextMock(request);
		const result = decorator(null, context);

		expect(result).toStrictEqual(['11', '5&&']);
	});

	it('should be parse parse split query', function () {
		// case of ?fields=a,v,c&fields=b,t,o
		const request = {
			query: {
				fields: ['a,v,c', 'b,t,o'],
			},
		};

		const context = getExecutionContextMock(request);
		const result = decorator(null, context);

		expect(result).toStrictEqual(['a', 'v', 'c', 'b', 't', 'o']);
	});
});
