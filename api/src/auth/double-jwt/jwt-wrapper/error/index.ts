import { MalformedJwtError } from 'src/auth/double-jwt/jwt-wrapper/error/malformed-jwt.error';
import { InvalidJwtSignatureError } from 'src/auth/double-jwt/jwt-wrapper/error/invalid-jwt-signature.error';

export { MalformedJwtError } from 'src/auth/double-jwt/jwt-wrapper/error/malformed-jwt.error';
export { InvalidJwtSignatureError } from 'src/auth/double-jwt/jwt-wrapper/error/invalid-jwt-signature.error';

export const ExpectedErrors = [MalformedJwtError, InvalidJwtSignatureError];
