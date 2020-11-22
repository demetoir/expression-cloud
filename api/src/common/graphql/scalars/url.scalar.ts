import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLError, GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { isURL } from 'class-validator';

export declare const Url: GraphQLScalarType;

export const GQL_SCALAR_TYPE_URL = 'Url';

@Scalar(GQL_SCALAR_TYPE_URL, () => Url)
export class UrlScalar implements CustomScalar<string, URL> {
	description = 'Url custom scalar type';

	parseValue(value: string): URL {
		if (!isURL(value)) {
			throw new GraphQLError('url scalar type must be url format');
		}

		return new URL(value);
	}

	serialize(value: URL): string {
		return value.toString();
	}

	parseLiteral(ast: ValueNode): URL {
		if (ast.kind !== Kind.STRING) {
			throw new GraphQLError(
				`Can only validate strings as URLs but got a: ${ast.kind}`,
			);
		}

		if (!isURL(ast.value)) {
			throw new GraphQLError('url scalar type must be url format');
		}

		return new URL(ast.value);
	}
}
