import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const _Includes = (data: string, ctx: ExecutionContext): string[] => {
	const request = ctx.switchToHttp().getRequest();

	const fields = request.query.includes || null;

	if (fields === null) {
		return [];
	}

	return fields.split(',').filter((x) => x.length > 0);
};

export const Includes = createParamDecorator(_Includes);
