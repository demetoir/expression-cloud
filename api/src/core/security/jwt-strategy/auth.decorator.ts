import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from 'src/core/security/jwt-strategy/roles.decorator';
import { JwtGuard } from 'src/core/security/jwt-strategy/jwt.guard';
import { RolesGuard } from 'src/core/security/jwt-strategy/role.guard';
import { RoleName } from '../role/role';

export const Auth = (...roleNames: RoleName[]): MethodDecorator =>
	applyDecorators(Roles(...roleNames), UseGuards(JwtGuard, RolesGuard));
