export interface Assessment {
  adminPage: {
    content: string;
    footer: string;
    header: string;
    title: string;
  };
  frameworks: string[];
  industry: string;
  language: string;
  ocupation: string;
  createdBy: string;
  createDate: number;
  passingGrade: number;
  name: string;
  company: string;
  description: string;
  userPage: {
    content: string;
    footer: string;
    header: string;
    title: string;
  };
}
