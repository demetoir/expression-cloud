import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY } from '../double-jwt/jwt-wrapper/constants';

@Injectable()
export class JwtGuard extends AuthGuard(JWT_STRATEGY) {}
