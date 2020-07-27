import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const _Includes = (data: string, ctx: ExecutionContext): string[] => {
	const request = ctx.switchToHttp().getRequest();

	const includes = request.query.includes || null;

	if (includes === null) {
		return [];
	}

	return includes.split(',').filter((x) => x.length > 0);
};

export const Includes = createParamDecorator(_Includes);
