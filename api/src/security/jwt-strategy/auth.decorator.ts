import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from 'src/security/jwt-strategy/roles.decorator';
import { RoleName } from 'src/security/role';
import { JwtGuard } from 'src/security/jwt-strategy/jwt.guard';
import { RolesGuard } from 'src/security/jwt-strategy/role.guard';

export const Auth = (...roleNames: RoleName[]): MethodDecorator =>
	applyDecorators(Roles(...roleNames), UseGuards(JwtGuard, RolesGuard));
