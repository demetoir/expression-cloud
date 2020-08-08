import { ApiCRUDDecorator } from '../apiPropertyOption.interface';
import { ApiResponse } from '@nestjs/swagger';
import { NotFoundException } from '../exception/notFound.exception';

export const ApiNotFoundResponse = (): ApiCRUDDecorator =>
	ApiResponse({
		type: NotFoundException,
		status: 404,
		description: 'not found resource',
	});
