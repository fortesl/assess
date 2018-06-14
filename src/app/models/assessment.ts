export interface Assessment {
  adminPage: {
    content: string;
    footer: string;
    header: string;
    title: string;
  };
  framework: string;
  industry: string;
  language?: string;
  field?: string;
  occupation: string;
  createdBy: string;
  createDate: string;
  passingGrade: number;
  startDate: string;
  endDate: string;
  name: string;
  company?: string;
  description?: string;
  level?: string;
  userPage: {
    content: string;
    footer: string;
    header: string;
    title: string;
  };
}
