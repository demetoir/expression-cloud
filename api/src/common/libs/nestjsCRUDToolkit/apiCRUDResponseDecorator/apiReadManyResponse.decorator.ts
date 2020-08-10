import { applyDecorators } from '@nestjs/common';
import { ApiCRUDOption } from '../apiPropertyOption.interface';
import { ApiOkResponse } from '../responseDecorator/apiOkReponse.decorator';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiBadRequestResponse } from '../responseDecorator/apiBadRequestResoponse.decorator';
import { ApiNotModifiedResponse } from '../responseDecorator/apiNotModifiedResponse.decorator';

export function ApiReadManyResponse(
	option: ApiCRUDOption,
): MethodDecorator & ClassDecorator {
	return applyDecorators(
		ApiOkResponse({
			type: option.type,
			isArray: true,
			description: 'get many resource',
			name: 'name',
		}),
		ApiNotModifiedResponse(),
		ApiBadRequestResponse(),
		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
	);
}
