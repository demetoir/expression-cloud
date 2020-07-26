import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ResourceIdTypeException } from '../exceptions/resourceIdTypeException';

export const _decorator = (token: string, ctx: ExecutionContext): number => {
	const request = ctx.switchToHttp().getRequest();

	const id = request.params[token] || null;

	if (id === null || isNaN(id)) {
		throw new ResourceIdTypeException(id, typeof Number);
	}

	return Number.parseInt(id, 10);
};

export const ResourceNumberId = createParamDecorator(_decorator);
