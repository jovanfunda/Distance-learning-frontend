import { Roles } from './roles.enum';

export interface User {
    fullName: string,
    email: string,
    roles: Roles
}