import { InputType } from '@nestjs/graphql';
import { NonNegativeIntField } from '../decorator';

export const GQL_INPUT_TYPE_PAGINATION_INPUT = 'PaginationInput';
export const DEFAULT_PAGINATION_OFFSET = 0;
export const DEFAULT_PAGINATION_LIMIT = 10;

@InputType(GQL_INPUT_TYPE_PAGINATION_INPUT, { isAbstract: true })
export class PaginationInputType {
	@NonNegativeIntField({
		nullable: true,
		defaultValue: DEFAULT_PAGINATION_OFFSET,
	})
	skip?: number = DEFAULT_PAGINATION_OFFSET;

	@NonNegativeIntField({
		nullable: true,
		defaultValue: DEFAULT_PAGINATION_LIMIT,
	})
	take?: number = DEFAULT_PAGINATION_LIMIT;
}
