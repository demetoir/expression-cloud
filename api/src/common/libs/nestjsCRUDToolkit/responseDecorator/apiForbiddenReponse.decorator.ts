import { ApiResponse } from '@nestjs/swagger';
import { ApiCRUDDecorator } from '../apiPropertyOption.interface';
import { ForbiddenException } from '../exception/forbidden.exception';

export const ApiForbiddenResponse = (): ApiCRUDDecorator =>
	ApiResponse({
		type: ForbiddenException,
		status: 403,
		description: 'forbidden resource access',
	});
