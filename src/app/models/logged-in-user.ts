export interface LoggedInUser {
  name: string;
  email: string;
  roles: string[];
}

export const userReset: LoggedInUser = {
  name: '',
  email: '',
  roles: []
  };
