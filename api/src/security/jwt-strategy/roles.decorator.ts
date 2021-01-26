import { RoleName } from 'src/security/role';
import { SetMetadata } from '@nestjs/common';

export const METADATA_KEY_ROLES = 'roles';

export const Roles = (...roles: RoleName[]): MethodDecorator =>
	SetMetadata(METADATA_KEY_ROLES, roles);
