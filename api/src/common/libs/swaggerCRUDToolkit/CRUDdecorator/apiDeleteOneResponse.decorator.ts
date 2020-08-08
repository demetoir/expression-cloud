import { applyDecorators } from '@nestjs/common';
import { ApiCRUDOption } from '../apiPropertyOption.interface';
import { ApiOkResponse } from '../responseDecorator/apiOkReponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiNotFoundResponse } from '../responseDecorator/apiNotFoundResponse.decorator';

export function ApiDeleteOneResponse(
	option: ApiCRUDOption,
): MethodDecorator & ClassDecorator {
	return applyDecorators(
		ApiOkResponse({ type: option.type, description }),
		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
		ApiNotFoundResponse(),
	);
}
