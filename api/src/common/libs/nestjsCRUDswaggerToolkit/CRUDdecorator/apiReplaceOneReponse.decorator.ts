import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '../responseDecorator/apiOkReponse.decorator';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiNotFoundResponse } from '../responseDecorator/apiNotFoundResponse.decorator';
import { ApiBadRequestResponse } from '../responseDecorator/apiBadRequestResoponse.decorator';

export function ApiReplaceOneResponse(): MethodDecorator & ClassDecorator {
	return applyDecorators(
		ApiOkResponse({
			isArray: false,
			description: 'success replace resource',
		}),
		ApiBadRequestResponse(),
		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
		ApiNotFoundResponse(),
	);
}
