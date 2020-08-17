export declare interface IPayload {
	//reserved jwt claims
	exp?: number;
	nbf?: number;
	iat?: number;

	aud?: string;

	iss?: string;
	sub?: string;

	//custom jwt claim
	type?: IPayloadType;
	uuid?: string;
	userId?: number;
}

export enum EPayloadType {
	access = 'access',
	refresh = 'refresh',
}

export declare type IPayloadType = EPayloadType;
