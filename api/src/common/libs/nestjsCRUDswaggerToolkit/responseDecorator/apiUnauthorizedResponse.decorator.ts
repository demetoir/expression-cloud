import { ApiResponse } from '@nestjs/swagger';
import { UnauthorizedException } from '../exception/unauthorized.exception';
import { ApiCRUDDecorator } from '../apiPropertyOption.interface';

export const ApiUnauthorizedResponse = (): ApiCRUDDecorator =>
	ApiResponse({
		type: UnauthorizedException,
		status: 401,
		description: 'unauthorized resource access',
	});
