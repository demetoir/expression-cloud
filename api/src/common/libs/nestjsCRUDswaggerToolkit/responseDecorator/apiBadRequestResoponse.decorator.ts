import { ApiCRUDDecorator } from '../apiPropertyOption.interface';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestException } from '../exception/badRequest.exception';

export const ApiBadRequestResponse = (): ApiCRUDDecorator =>
	ApiResponse({
		type: BadRequestException,
		status: 400,
		description: 'invalid request',
	});
