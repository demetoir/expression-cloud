import { applyDecorators } from '@nestjs/common';
import {
	ApiCRUDDecorator,
	ApiCRUDOption,
} from '../apiPropertyOption.interface';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiNotFoundResponse } from '../responseDecorator/apiNotFoundResponse.decorator';
import { ApiOkResponse } from '../responseDecorator/apiOkReponse.decorator';
import { ApiBadRequestResponse } from '../responseDecorator/apiBadRequestResoponse.decorator';

export function ApiReadOneResponse(option: ApiCRUDOption): ApiCRUDDecorator {
	return applyDecorators(
		ApiOkResponse({
			type: option.type,
			isArray: false,
			description: 'get one resource',
		}),
		ApiBadRequestResponse(),

		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
		ApiNotFoundResponse(),
	);
}
