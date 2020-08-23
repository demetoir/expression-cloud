import { MalformedJWTError } from './MalformedJWT.error';
import { InvalidJWTSignatureError } from './InvalidJWTSignature.error';

export { MalformedJWTError } from './MalformedJWT.error';
export { InvalidJWTSignatureError } from './InvalidJWTSignature.error';
export const ExpectedErrors = [MalformedJWTError, InvalidJWTSignatureError];
