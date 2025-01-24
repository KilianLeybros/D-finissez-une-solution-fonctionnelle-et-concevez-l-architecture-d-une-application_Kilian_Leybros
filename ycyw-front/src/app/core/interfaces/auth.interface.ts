import { Role } from '../enums/role.enum';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  password: string;
  supportRequestId?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
