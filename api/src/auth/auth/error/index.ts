import { BaseNestedError } from 'src/common/error/BaseNestedError';

export class AuthenticationError extends BaseNestedError {}

export class AuthorizeError extends BaseNestedError {}

export class InvalidUserException extends Error {}
