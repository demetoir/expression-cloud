import { applyDecorators } from '@nestjs/common';
import {
	ApiCRUDDecorator,
	ApiCRUDOption,
} from '../apiPropertyOption.interface';
import { ApiUnauthorizedResponse } from '../responseDecorator/apiUnauthorizedResponse.decorator';
import { ApiForbiddenResponse } from '../responseDecorator/apiForbiddenReponse.decorator';
import { ApiNotFoundResponse } from '../responseDecorator/apiNotFoundResponse.decorator';
import { ApiOkResponse } from '../responseDecorator/apiOkReponse.decorator';

export function ApiReadOneResponse(option: ApiCRUDOption): ApiCRUDDecorator {
	return applyDecorators(
		ApiOkResponse(option),
		ApiUnauthorizedResponse(),
		ApiForbiddenResponse(),
		ApiNotFoundResponse(),
	);
}
