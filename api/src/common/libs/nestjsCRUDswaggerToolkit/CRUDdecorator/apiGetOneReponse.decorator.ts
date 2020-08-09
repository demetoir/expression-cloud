import { applyDecorators } from '@nestjs/common';
import { ApiCRUDDecorator } from '../apiPropertyOption.interface';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiNotFoundResponse } from '../responseDecorator/apiNotFoundResponse.decorator';
import { ApiOkResponse } from '../responseDecorator/apiOkReponse.decorator';
import { ApiBadRequestResponse } from '../responseDecorator/apiBadRequestResoponse.decorator';

export function ApiGetOneResponse(): ApiCRUDDecorator {
	return applyDecorators(
		ApiOkResponse({
			isArray: false,
			description: 'get one resource',
		}),
		ApiBadRequestResponse(),
		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
		ApiNotFoundResponse(),
	);
}
