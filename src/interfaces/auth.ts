export interface User {
  email: string;
  username: string;
}

export interface AuthState {
  initialized: boolean;
  user: User | null;
}
