import { Kind, ValueNode } from 'graphql';
import { DateTimeScalar } from 'src/common/graphql';

describe('DateTime', () => {
	let dateTimeScalar: DateTimeScalar;
	beforeEach(async () => {
		dateTimeScalar = new DateTimeScalar();
	});

	it('should prepare test', async () => {
		expect(dateTimeScalar).toBeDefined();
	});

	it('should defined', async () => {
		expect(DateTimeScalar).toBeDefined();
	});

	describe('parseValue method', () => {
		// happy path arg and return value
		const value = 123;
		const expectedParsedValue = new Date(value);

		it('should defined', async () => {
			expect(dateTimeScalar.parseValue);
		});

		it('should take arg value as number', async () => {
			dateTimeScalar.parseValue(value);
		});

		it('should return parsed value as Date', async () => {
			// given

			// when
			const res = dateTimeScalar.parseValue(value);

			// than
			expect(res).toStrictEqual(expectedParsedValue);
		});
	});

	describe(`serialize method`, () => {
		// happy path arg and return value
		const value = new Date();
		const serializedValue = value.getTime();

		it('should defined', async () => {
			expect(dateTimeScalar.serialize);
		});

		it('should take arg value as Date', async () => {
			dateTimeScalar.serialize(value);
		});

		it('should return serialize value as number', async () => {
			// given

			// when
			const res = dateTimeScalar.serialize(value);

			// than
			expect(res).toBe(serializedValue);
		});
	});

	describe(`parseLiteral method`, () => {
		// happy path arg and return value
		const value = '123';
		const parsedValue = new Date(value);
		const ast: ValueNode = { kind: Kind.INT, loc: undefined, value };

		it('should defined', async () => {
			expect(dateTimeScalar.parseLiteral);
		});

		it('should take arg ast as ValueNode ', async () => {
			dateTimeScalar.parseLiteral(ast);
		});

		it('should return parsed value as Date', async () => {
			// given

			// when
			const res = dateTimeScalar.parseLiteral(ast);

			// than
			expect(res).toStrictEqual(parsedValue);
		});
	});
});
