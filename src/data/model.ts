export interface IStudentMark {
  id: number;
  mark: number;
  related_to: number;
  data: string;
}

export interface IUsers {
  id: number;
  full_name: string;
  login: string;
  password: string;
  isTeacher: boolean;
}
