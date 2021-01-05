import { BaseNestError } from 'src/common/errors/base-nest.error';

export class InvalidJwtSignatureError extends BaseNestError {}
