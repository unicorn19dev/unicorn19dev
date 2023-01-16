import { SetMetadata } from '@nestjs/common';
import { roleType } from '../schemas/user.schema';
import { adminRoleType } from '../schemas/adminusers.schema';

export const Role = { ...roleType, ...adminRoleType };

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
