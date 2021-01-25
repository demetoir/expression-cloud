import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GQLContext } from '../types';

export const Cookies = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		// only work for graphql executionContext
		// need find more type safe solution
		const { req }: GQLContext = ctx.getArgs()[2] as GQLContext;

		return data ? req.cookies?.[data] : req.cookies;
	},
);
