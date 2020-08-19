import { IPayload, IPayloadType } from '../double-jwt/interface';

export interface ITokenPayload extends IPayload {
	userName: string;
	role: string;
	userId: number;

	// override props
	// reserved jwt claims
	exp?: number;
	nbf?: number;
	iat?: number;

	aud?: string;

	iss?: string;
	sub?: string;

	// custom jwt claim
	type?: IPayloadType;
	uuid?: string;
}

export interface ITokenService {
	createOne(payload, uuid);

	deleteOne(payload, uuid);

	findOne(uuid);
}
