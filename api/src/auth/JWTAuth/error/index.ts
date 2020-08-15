import { baseNestedError } from '../../../common/error/BaseNested.error';

export class JWTPayloadTypeError extends baseNestedError {}

export class JWTMalformedError extends baseNestedError {}

export class JWTInvalidSignatureError extends baseNestedError {}
