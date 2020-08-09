import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse } from '../responseDecorator/apiCreatedResoponse.decorator';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiBadRequestResponse } from '../responseDecorator/apiBadRequestResoponse.decorator';

export function ApiCreateManyResponse(): MethodDecorator & ClassDecorator {
	return applyDecorators(
		ApiCreatedResponse({
			isArray: true,
			description: 'success create bulk resource',
		}),
		ApiBadRequestResponse(),
		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
	);
}
