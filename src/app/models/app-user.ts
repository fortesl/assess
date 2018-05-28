export interface AppUser {
  name: string;
  email: string;
  roles: string[];
  assessments?: string[];
}

export const userReset: AppUser = {
  name: '',
  email: '',
  roles: []
  };
