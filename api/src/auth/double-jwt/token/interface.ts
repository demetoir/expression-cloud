import { IPayload, IPayloadType } from '../jwt-wrapper/interface';

export interface ITokenPayload extends IPayload {
	userName: string;
	role: string;
	userId: number;

	// override props
	// reserved jwt-wrapper claims
	exp?: number;
	nbf?: number;
	iat?: number;

	aud?: string;

	iss?: string;
	sub?: string;

	// custom jwt-wrapper claim
	type?: IPayloadType;
	uuid?: string;
}

export interface ITokenService {
	createOne(payload, uuid);

	deleteOne(payload, uuid);

	findOne(uuid);
}
