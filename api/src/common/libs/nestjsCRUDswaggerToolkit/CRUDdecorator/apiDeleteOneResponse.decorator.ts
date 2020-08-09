import { applyDecorators } from '@nestjs/common';
import { ApiCRUDOption } from '../apiPropertyOption.interface';
import { ApiOkResponse } from '../responseDecorator/apiOkReponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiNotFoundResponse } from '../responseDecorator/apiNotFoundResponse.decorator';
import { ApiBadRequestResponse } from '../responseDecorator/apiBadRequestResoponse.decorator';

export function ApiDeleteOneResponse(): MethodDecorator & ClassDecorator {
	return applyDecorators(
		ApiOkResponse({
			description: 'success delete resource',
		}),
		ApiBadRequestResponse(),
		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
		ApiNotFoundResponse(),
	);
}
