import { Resume } from '@/types/resume';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resume?: Resume;
  public?: boolean;
  avatar?: string;
  propositions?: string[];
}

export interface AuthStore {
  users: User[];
  currentUser: User | null;
}

export interface AddUserAction {
  user: User;
}

// common types
// service types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
}

// redux types
export interface AuthStore {
  users: User[];
  currentUser: User | null;
}

export interface AddUserAction {
  user: User;
}

export interface SetCurrentUserAction {
  user: User;
}

// ui types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
