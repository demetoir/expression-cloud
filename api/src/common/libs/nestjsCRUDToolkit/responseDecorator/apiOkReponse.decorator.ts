import { ApiResponse } from '@nestjs/swagger';
import {
	ApiCRUDDecorator,
	ApiCRUDOption,
} from '../apiPropertyOption.interface';

export const ApiOkResponse = (option: ApiCRUDOption): ApiCRUDDecorator =>
	ApiResponse({
		type: option.type,
		isArray: option.isArray,
		status: 200,
		description: option.description || 'request success',
	});
