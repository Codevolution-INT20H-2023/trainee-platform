import { StackList } from '@/types/project';
import {
  Contact,
  Language,
  PersonalInfo,
  Project,
  Resume,
} from '@/types/resume';

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

export interface ChangePasswordAction {
  password: string;
}
export interface ChangeUserInfoAction {
  lastName: string;
  firstName: string;
  email: string;
}

export interface ChangeUserInfoFormData {
  lastName: string;
  firstName: string;
  email: string;
}

export interface ChangePasswordFormData {
  newPassword: string;
  oldPassword: string;
  confirmPassword: string;
}

export interface ChangeResumeInfo {
  position: string;
  description: string;
  education: string[];
  stack: StackList[];
  contacts: Contact[];
  personal: PersonalInfo;
  languages: Language[];
  projects: Project[];
  skills: string[];
}

export interface SubmitChangeResumeInfo {
  position: string;
  description: string;
  education: string[];
  stack: StackList[];
  contacts: Contact[];
  age: number;
  photo: string;
  nationality: string;
  languages: Language[];
  projects: Project[];
  skills: string[];
}

export interface InitialUserInfoData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface InitialPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
