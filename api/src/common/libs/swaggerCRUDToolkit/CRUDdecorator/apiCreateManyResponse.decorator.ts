import { applyDecorators } from '@nestjs/common';
import { ApiCRUDOption } from '../apiPropertyOption.interface';
import { ApiCreatedResponse } from '../responseDecorator/apiCreatedResoponse.decorator';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiBadRequestResponse } from '../responseDecorator/apiBadRequestResoponse.decorator';

export function ApiCreateManyResponse(
	option: ApiCRUDOption,
): MethodDecorator & ClassDecorator {
	return applyDecorators(
		ApiCreatedResponse({
			type: option.type,
			isArray: true,
			description: 'success create bulk resource',
		}),
		ApiBadRequestResponse(),

		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
	);
}
