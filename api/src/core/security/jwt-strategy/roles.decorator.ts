import { SetMetadata } from '@nestjs/common';
import { RoleName } from '../../user';

export const METADATA_KEY_ROLES = 'roles';

export const Roles = (...roles: RoleName[]): MethodDecorator =>
	SetMetadata(METADATA_KEY_ROLES, roles);
