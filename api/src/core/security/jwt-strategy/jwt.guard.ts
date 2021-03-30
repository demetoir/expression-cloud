import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { JWT_STRATEGY } from './jwt.strategy';

@Injectable()
export class JwtGuard extends AuthGuard(JWT_STRATEGY) {
	// for graphql compatible
	// https://docs.nestjs.com/security/authentication#graphql
	getRequest(context: ExecutionContext): Request {
		const ctx = GqlExecutionContext.create(context);

		return ctx.getContext().req;
	}
}
