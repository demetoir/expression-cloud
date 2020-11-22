import { GraphQLError, Kind, ValueNode } from 'graphql';
import { UUIDScalar } from 'src/common/graphql';
import { v4 as uuidV4 } from 'uuid';
import { isUUID } from 'class-validator';

describe('UUIDScalar', () => {
	let uuidScalar: UUIDScalar;

	beforeEach(async () => {
		uuidScalar = new UUIDScalar();
	});

	it('should be prepared test', async () => {
		expect(uuidScalar).toBeDefined();
	});

	it('should defined', async () => {
		expect(UUIDScalar).toBeDefined();
		expect(new UUIDScalar()).toBeDefined();
	});

	const uuidString = uuidV4();
	const notUuidString = 'not uuid string';

	describe('parseValue method', () => {
		// happy path arg and return value
		const value = uuidString;
		const expectedParsedValue = uuidString;

		it('should defined', async () => {
			expect(uuidScalar.parseValue);
		});

		it('should take arg value as string', async () => {
			uuidScalar.parseValue(value);
		});

		it('should return parsed value as string', async () => {
			// given

			// when
			const res = uuidScalar.parseValue(value);

			// than
			expect(res).toStrictEqual(expectedParsedValue);
		});
	});

	describe(`serialize method`, () => {
		// happy path arg and return value
		const value = uuidString;
		const serializedValue = uuidString;

		it('should defined', async () => {
			expect(uuidScalar.serialize);
		});

		it('should take arg value as string', async () => {
			uuidScalar.serialize(value);
		});

		it('should return serialize value as string', async () => {
			// given

			// when
			const res = uuidScalar.serialize(value);

			// than
			expect(res).toBe(serializedValue);
		});
	});

	describe(`parseLiteral method`, () => {
		// happy path arg and return value
		const parsedValue = uuidString;

		const expectedAst: ValueNode = {
			kind: Kind.STRING,
			loc: undefined,
			value: uuidString,
		};
		const astOfNotString: ValueNode = {
			kind: Kind.BOOLEAN,
			loc: undefined,
			value: false,
		};
		const astOfNotUuidV4String: ValueNode = {
			kind: Kind.STRING,
			loc: undefined,
			value: notUuidString,
		};

		it('should prepared to test', async () => {
			expect(astOfNotString.kind).not.toBe(expectedAst.kind);
			expect(isUUID(astOfNotUuidV4String.value, 4)).toBeFalsy();
		});

		it('should defined', async () => {
			expect(uuidScalar.parseLiteral);
		});

		it('should return parsed value as string', async () => {
			// given
			const ast = expectedAst;

			// when
			const res = uuidScalar.parseLiteral(ast);

			// than
			expect(res).toStrictEqual(parsedValue);
		});

		it('should throw GraphQLError, if ast.kind is not string', async () => {
			// given
			const ast: ValueNode = astOfNotString;

			// when
			const expected = expect(() => {
				uuidScalar.parseLiteral(ast);
			});

			expected.toThrow(GraphQLError);
			expected.toThrow(
				'you can only parse string but you got BooleanValue',
			);
		});

		it('should throw GraphQLError, if ast.value is not uuid v4', async () => {
			// given
			const ast: ValueNode = astOfNotUuidV4String;

			// when
			const expected = expect(() => {
				uuidScalar.parseLiteral(ast);
			});

			expected.toThrow(GraphQLError);
			expected.toThrow('not a uuid v4');
		});
	});
});
