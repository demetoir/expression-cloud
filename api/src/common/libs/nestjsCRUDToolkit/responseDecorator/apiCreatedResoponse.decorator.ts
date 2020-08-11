import {
	ApiCRUDDecorator,
	ApiCRUDOption,
} from '../apiPropertyOption.interface';
import { ApiResponse } from '@nestjs/swagger';

export const ApiCreatedResponse = (option: ApiCRUDOption): ApiCRUDDecorator =>
	ApiResponse({
		type: option.type,
		status: 201,
		isArray: option.isArray,
		description: 'resource created',
	});