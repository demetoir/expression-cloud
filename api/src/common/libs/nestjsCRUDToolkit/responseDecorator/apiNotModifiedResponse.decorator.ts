import { ApiResponse } from '@nestjs/swagger';
import { ApiCRUDDecorator } from '../apiPropertyOption.interface';

export const ApiNotModifiedResponse = (): ApiCRUDDecorator =>
	ApiResponse({
		status: 304,
		description: 'resource not modified',
	});
