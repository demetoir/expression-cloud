import { TokenPayload } from 'src/security/token/token-payload';

export declare interface ISignedResult {
	token: string;
	payload: TokenPayload<any>;
}
