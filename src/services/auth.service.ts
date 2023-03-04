import { User } from '@/types/auth';

import DB from '../../db.json';

class Auth {
  getAll(): User[] {
    return DB.users;
  }

  login() {

  }

  register() {

}
}

const authService = new Auth();

export default authService;
