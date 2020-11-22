import { UrlScalar } from 'src/common/graphql';
import { internet, seed } from 'faker';
import { GraphQLError, Kind, ValueNode } from 'graphql';
import { isURL } from 'class-validator';

describe('URLScalar', () => {
	let urlScalar: UrlScalar;

	beforeAll(() => {
		seed(0);
	});

	beforeEach(async () => {
		urlScalar = new UrlScalar();
	});

	it('should be prepared test', async () => {
		expect(urlScalar).toBeDefined();
	});

	it('should defined', async () => {
		expect(UrlScalar).toBeDefined();
	});

	const urlOfURLType: URL = new URL(internet.url());
	const urlOfStringType: string = urlOfURLType.toString();

	const stringOfNotUrlStringType = 'not url string' as const;

	it('should be prepared to test', async () => {
		expect(urlOfStringType).toBeDefined();
		expect(urlOfStringType).toBeDefined();
		expect(stringOfNotUrlStringType).toBeDefined();

		expect(isURL(stringOfNotUrlStringType)).toBeFalsy();
	});

	describe('parseValue method', () => {
		it('should defined', async () => {
			expect(urlScalar.parseValue);
		});

		it('should return parsed value as URL', async () => {
			// given
			const value: string = urlOfStringType;

			// when
			const res = urlScalar.parseValue(value);

			// than
			const expectedParsedValue = urlOfURLType;
			expect(res).toStrictEqual(expectedParsedValue);
		});

		it('should throw GraphQLError, if value is not string of url', async () => {
			// given
			const value: string = stringOfNotUrlStringType;

			// when
			const expected = expect(() => {
				urlScalar.parseValue(value);
			});

			expected.toThrow(GraphQLError);
			expected.toThrow('url scalar type must be url format');
		});
	});

	describe(`serialize method`, () => {
		// happy path arg and return value

		it('should defined', async () => {
			expect(urlScalar.serialize);
		});

		it('should return serialize value as string', async () => {
			// given
			const value = urlOfURLType;

			// when
			const res = urlScalar.serialize(value);

			// than
			const expectedSerializedValue = urlOfStringType;
			expect(res).toBe(expectedSerializedValue);
		});
	});

	describe(`parseLiteral method`, () => {
		const astOfNormal: ValueNode = {
			kind: Kind.STRING,
			loc: undefined,
			value: urlOfStringType,
		};
		const astOfKindIsNotString: ValueNode = {
			kind: Kind.BOOLEAN,
			loc: undefined,
			value: false,
		};
		const astOfValueIsNotUrlString: ValueNode = {
			kind: Kind.STRING,
			loc: undefined,
			value: stringOfNotUrlStringType,
		};

		it('should be prepared to test', async () => {
			expect(astOfNormal).toBeDefined();
			expect(astOfKindIsNotString).toBeDefined();
			expect(astOfValueIsNotUrlString).toBeDefined();
			expect(astOfKindIsNotString.kind).not.toBe(astOfNormal.kind);
		});

		it('should defined', async () => {
			expect(urlScalar.parseLiteral);
		});

		it('should return parsed value as URL type', async () => {
			// given
			const ast = astOfNormal;

			// when
			const res = urlScalar.parseLiteral(ast);

			// than
			const expectedRes = urlOfURLType;
			expect(res).toStrictEqual(expectedRes);
		});

		it('should throw GraphQLError, if ast.kind is not string', async () => {
			// given
			const ast = astOfKindIsNotString;

			// when
			const expected = expect(() => {
				urlScalar.parseLiteral(ast);
			});

			// than
			expected.toThrow(GraphQLError);
			expected.toThrow(
				'Can only validate strings as URLs but got a: BooleanValue',
			);
		});

		it('should throw GraphQLError, if ast.value is not url format', async () => {
			// given
			const ast = astOfValueIsNotUrlString;

			// when
			const expected = expect(() => {
				urlScalar.parseLiteral(ast);
			});

			// than
			expected.toThrow(GraphQLError);
			expected.toThrow('url scalar type must be url format');
		});
	});
});
