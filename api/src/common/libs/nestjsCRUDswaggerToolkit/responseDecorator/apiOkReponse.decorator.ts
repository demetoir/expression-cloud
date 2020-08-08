import {
	ApiCRUDDecorator,
	ApiCRUDOption,
} from '../apiPropertyOption.interface';
import { ApiResponse } from '@nestjs/swagger';

export const ApiOkResponse = (option: ApiCRUDOption): ApiCRUDDecorator =>
	ApiResponse({
		type: option.type,
		status: 200,
		description: option.description || 'request success',
	});
