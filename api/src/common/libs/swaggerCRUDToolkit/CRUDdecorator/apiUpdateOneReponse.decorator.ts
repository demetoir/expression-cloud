import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NotFoundException } from '../exception/notFound.exception';
import { ForbiddenException } from '../exception/forbidden.exception';
import { UnauthorizedException } from '../exception/unauthorized.exception';
import { ApiCRUDOption } from '../apiPropertyOption.interface';

export function ApiUpdateOneResponse(
	option: ApiCRUDOption,
): MethodDecorator & ClassDecorator {
	return applyDecorators(
		ApiResponse({ type: option.type, status: 200 }),
		ApiResponse({
			type: UnauthorizedException,
			status: 401,
		}),
		ApiResponse({ type: ForbiddenException, status: 403 }),
		ApiResponse({ type: NotFoundException, status: 404 }),
	);
}
