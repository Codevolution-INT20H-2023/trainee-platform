// common types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// service types

// redux types
export interface AuthStore {
  users: User[];
  currentUser: User | null;
}

export interface AddUserAction {
  user: User;
}
