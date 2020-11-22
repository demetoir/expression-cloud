import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const decorator = (data: string, ctx: ExecutionContext): string[] => {
	const request = ctx.switchToHttp().getRequest();

	let includes = request.query.includes || null;

	if (Array.isArray(includes)) {
		includes = includes.join(',');
	}

	if (includes === null) {
		return [];
	}

	return includes.split(',').filter((x) => x.length > 0);
};

export const Includes = createParamDecorator(decorator);
