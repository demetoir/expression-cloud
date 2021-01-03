import { InputType, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { DoubleJwtService, ITokenPayload } from 'src/auth/double-jwt';
import { StringField } from 'src/common';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt-strategy';

export const GQL_INPUT_TYPE_JWT_RESPONSE = 'JWTResponseInput';
export const GQL_OBJECT_TYPE_JWT_RESPONSE = 'JWTResponse';

@InputType(GQL_INPUT_TYPE_JWT_RESPONSE)
@ObjectType(GQL_OBJECT_TYPE_JWT_RESPONSE)
class JWTResponse {
	@StringField()
	accessToken: string;

	@StringField()
	refreshToken: string;
}

@ObjectType()
class WhoAmI {
	@StringField()
	message: string;
}

@Resolver(() => JWTResponse)
export class AuthResolver {
	constructor(private readonly doubleJwtService: DoubleJwtService) {}

	@Query(() => JWTResponse)
	async getToken(): Promise<JWTResponse> {
		const payload: ITokenPayload = {
			role: 'shit',
			userId: 1,
			userName: 'what',
		};

		const {
			accessToken,
			refreshToken,
		} = await this.doubleJwtService.issueToken(payload);

		const jwtResponse = new JWTResponse();
		jwtResponse.accessToken = accessToken;
		jwtResponse.refreshToken = refreshToken;

		return jwtResponse;
	}

	async refreshToken() {}

	async revokeToken() {}

	@UseGuards(JwtGuard)
	@Query(() => WhoAmI)
	async whoAmI(): Promise<WhoAmI> {
		const whoami = new WhoAmI();

		whoami.message = 'shit';

		return whoami;
	}
}
