import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const _decorator = (token: string, ctx: ExecutionContext): string[] => {
	const request = ctx.switchToHttp().getRequest();

	const fields = request.query.fields || null;

	if (fields === null) {
		return [];
	}

	return fields.split(',');
};

export const Fields = createParamDecorator(_decorator);
