import { BaseNestedError } from '../../../common/error/BaseNestedError';

export class JWTPayloadTypeError extends BaseNestedError {}

export class JWTMalformedError extends BaseNestedError {}

export class JWTInvalidSignatureError extends BaseNestedError {}

export class JWTExpiredError extends BaseNestedError {}

export class InvalidJwtPayloadError extends BaseNestedError {}
