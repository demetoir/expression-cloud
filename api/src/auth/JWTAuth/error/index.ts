import { BaseNestedError } from '../../../common/error/BaseNestedError';

export class JWTPayloadTypeError extends BaseNestedError {}

export class JWTMalformedError extends BaseNestedError {}

export class JWTInvalidSignatureError extends BaseNestedError {}
