import { ApiResponseProperty } from '../responseDecorator/apiResponseProperty.decorator';

export class ForbiddenException {
	@ApiResponseProperty({
		example: 403,
	})
	statusCode: number;

	@ApiResponseProperty({
		example: 'Forbidden',
	})
	error: string;

	@ApiResponseProperty({
		example: `Forbidden resource`,
	})
	message: string;
}
