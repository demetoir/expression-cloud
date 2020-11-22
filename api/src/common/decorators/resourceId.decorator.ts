import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ResourceIdTypeException } from '../exceptions/resourceIdTypeException';

export const decorator = (token: string, ctx: ExecutionContext): number => {
	if (token === undefined || token === null) {
		throw new TypeError(`token should be string, not ${typeof token}`);
	}

	const request = ctx.switchToHttp().getRequest();

	const resourceId = request.params[token] || null;

	if (resourceId === null || isNaN(resourceId)) {
		throw new ResourceIdTypeException(resourceId, typeof Number);
	}

	return Number.parseInt(resourceId, 10);
};

export const ResourceNumberId = createParamDecorator(decorator);
