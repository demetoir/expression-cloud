import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

export declare const DateTime: GraphQLScalarType;

export const GQL_SCALAR_TYPE_DATETIME = 'DateTime';

@Scalar(GQL_SCALAR_TYPE_DATETIME, () => DateTime)
export class DateTimeScalar implements CustomScalar<number, Date> {
	description = 'Date custom scalar type';

	parseValue(value: number): Date {
		return new Date(value);
	}

	serialize(value: Date): number {
		return value.getTime();
	}

	// todo 이부분 parseLiteral 실패시 graphql error 로 처리하도록 변경하기
	parseLiteral(ast: ValueNode): Date {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value);
		}

		return null;
	}
}
