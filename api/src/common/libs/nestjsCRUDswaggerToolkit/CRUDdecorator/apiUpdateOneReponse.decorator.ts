import { applyDecorators } from '@nestjs/common';
import { ApiCRUDOption } from '../apiPropertyOption.interface';
import { ApiOkResponse } from '../responseDecorator/apiOkReponse.decorator';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiNotFoundResponse } from '../responseDecorator/apiNotFoundResponse.decorator';
import { ApiBadRequestResponse } from '../responseDecorator/apiBadRequestResoponse.decorator';

export function ApiUpdateOneResponse(
	option: ApiCRUDOption,
): MethodDecorator & ClassDecorator {
	return applyDecorators(
		ApiOkResponse({
			type: option.type,
			description: 'success update resource',
		}),
		ApiBadRequestResponse(),
		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
		ApiNotFoundResponse(),
	);
}
