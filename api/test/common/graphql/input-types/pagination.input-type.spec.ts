import { PaginationInputType } from 'src/common/graphql';

describe('PaginationInputType', () => {
	it('should defined', async () => {
		expect(PaginationInputType).toBeDefined();
		expect(new PaginationInputType()).toBeDefined();
	});

	const input = new PaginationInputType();

	it('should define take field', async () => {
		input.take = 1;
	});

	it('should define skip field', async () => {
		input.skip = 1;
	});
});
