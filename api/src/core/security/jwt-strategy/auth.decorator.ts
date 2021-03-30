import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './role.guard';
import { RoleName } from '../../user';

export const Auth = (...roleNames: RoleName[]): MethodDecorator =>
	applyDecorators(Roles(...roleNames), UseGuards(JwtGuard, RolesGuard));
