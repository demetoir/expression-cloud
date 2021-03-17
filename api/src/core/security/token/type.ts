import { TokenPayload } from 'src/core/security/token/token-payload';

export declare interface ISignedResult {
	token: string;
	payload: TokenPayload<any>;
}
