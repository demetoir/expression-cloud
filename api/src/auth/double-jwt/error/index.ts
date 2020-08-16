import { BaseNestedError } from '../../../common/error/BaseNestedError';

// todo: split files
export class MalformedJWTError extends BaseNestedError {}

export class InvalidJWTSignatureError extends BaseNestedError {}

export class ExpiredJwtError extends BaseNestedError {}

export class InvalidJwtPayloadError extends BaseNestedError {}
