import * as jwt from 'jsonwebtoken';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser, User } from '../dto/user.dto';

export interface JwtPayload {
	email: string;
	role: string;
	id: string;
	iat: string;
}

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,

			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();

		const token = request.headers.authorization?.replace('Bearer ', '');

		try {
			const { role } = jwt.verify(
				token,
				'hard!to-guess_secret',
			) as unknown as JwtPayload;
			return requiredRoles.some((requiredRole) =>
				role?.includes(requiredRole),
			);
		} catch {
			return false;
		}
	}
}
