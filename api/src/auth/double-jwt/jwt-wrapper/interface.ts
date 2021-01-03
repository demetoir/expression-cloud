export declare interface IPayload {
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

export enum PayloadTypes {
	access = 'access',
	refresh = 'refresh',
}

export declare type IPayloadType = PayloadTypes;
