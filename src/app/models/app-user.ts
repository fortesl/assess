export interface AppUser {
  name: string;
  email: string;
  roles: string[];
  assessments?: string[];
  uid?: string;
}

export const userReset: AppUser = {
  name: '',
  email: '',
  roles: []
  };
