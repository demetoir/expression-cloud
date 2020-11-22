import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLError, GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { isUUID } from 'class-validator';

export declare const UUID: GraphQLScalarType;

export const GQL_SCALAR_TYPE_UUID = 'UUID';

@Scalar(GQL_SCALAR_TYPE_UUID, () => UUID)
export class UUIDScalar implements CustomScalar<string, string> {
	description = 'UUID custom scalar type';

	// value from the clients
	parseValue(value: string): string {
		if (!isUUID(value, 4)) {
			throw new GraphQLError('not a uuid v4');
		}

		return value;
	}

	// value sent to the client
	serialize(value: string): string {
		return value;
	}

	parseLiteral(ast: ValueNode): string {
		if (ast.kind !== Kind.STRING) {
			throw new GraphQLError(
				`you can only parse string but you got ${ast.kind}`,
			);
		}

		if (!isUUID(ast.value, 4)) {
			throw new GraphQLError('not a uuid v4');
		}

		return ast.value;
	}
}
