export interface UserFormData {
  name: string;
  age: number;
  email: string;
}

export interface RootState {
  form: UserFormData;
}
