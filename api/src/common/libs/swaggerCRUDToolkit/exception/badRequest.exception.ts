import { ApiResponseProperty } from '../responseDecorator/apiResponseProperty.decorator';

export class BadRequestException {
	@ApiResponseProperty({
		example: 400,
	})
	statusCode: number;

	@ApiResponseProperty({
		example: 'BadRequest',
	})
	error: string;

	@ApiResponseProperty({
		example: `invalid request`,
	})
	message: string;
}
