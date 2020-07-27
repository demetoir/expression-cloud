import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const _Fields = (token: string, ctx: ExecutionContext): string[] => {
	const request = ctx.switchToHttp().getRequest();

	const fields = request.query.fields || null;

	if (fields === null) {
		return [];
	}

	return fields.split(',').filter((x) => x.length > 0);
};

export const Fields = createParamDecorator(_Fields);
