import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from '@/types/auth';

import DB from '../../db.json';

class Auth {
  private findUser(email: string) {
    return DB.users.find(user => user.email === email);
  }

  getAll(): User[] {
    return DB.users;
  }

  login({ password, email }: LoginPayload): AuthResponse {
    const user = this.findUser(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (password !== user.password) {
      throw new Error('Incorrect password');
    }

    return { user };
  }

  register(payload: RegisterPayload): AuthResponse {
    const user = this.findUser(payload.email);

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = { id: DB.users.length + 1, ...payload };
    return { user: newUser };
  }
}

const authService = new Auth();

export default authService;
