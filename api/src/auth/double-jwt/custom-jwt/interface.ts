export declare interface IPayload {
	//reserved custom-jwt claims
	exp?: number;
	nbf?: number;
	iat?: number;

	aud?: string;

	iss?: string;
	sub?: string;

	//custom custom-jwt claim
	type?: IPayloadType;
	uuid?: string;
	userId?: number;
}

export enum PayloadTypes {
	access = 'access',
	refresh = 'refresh',
}

export declare type IPayloadType = PayloadTypes;
