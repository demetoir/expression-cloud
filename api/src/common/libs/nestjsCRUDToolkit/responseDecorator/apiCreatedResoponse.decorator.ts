import { ApiResponse } from '@nestjs/swagger';
import {
	ApiCRUDDecorator,
	ApiCRUDOption,
} from '../apiPropertyOption.interface';

export const ApiCreatedResponse = (option: ApiCRUDOption): ApiCRUDDecorator =>
	ApiResponse({
		type: option.type,
		status: 201,
		isArray: option.isArray,
		description: 'resource created',
	});
