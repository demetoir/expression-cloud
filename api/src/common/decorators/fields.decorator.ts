import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const decorator = (token: string, ctx: ExecutionContext): string[] => {
	const request = ctx.switchToHttp().getRequest();

	let fields = request.query.fields || null;

	if (Array.isArray(fields)) {
		fields = fields.join(',');
	}

	if (fields === null) {
		return [];
	}

	return fields.split(',').filter((x) => x.length > 0);
};

export const Fields = createParamDecorator(decorator);
