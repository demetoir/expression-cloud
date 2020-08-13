import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY } from '../token/constants';

@Injectable()
export class JWTGuard extends AuthGuard(JWT_STRATEGY) {}
