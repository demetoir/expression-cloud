import { ApiResponseProperty } from '../responseDecorator/apiResponseProperty.decorator';

export class NotFoundException {
	@ApiResponseProperty({
		example: 404,
	})
	statusCode: number;

	@ApiResponseProperty({
		example: 'Not Found',
	})
	error: string;

	@ApiResponseProperty({
		example: `entity not found`,
	})
	message: string;
}
