export interface CreateUserPort {
  email: string;
  phoneNumber: string;
  password?: string;
  birthDate?: Date;
}
