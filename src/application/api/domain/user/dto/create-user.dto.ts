export class CreateUserBodyDto {
  email: string;
  password?: string;
  birth?: Date;
  phoneNumber: string;
}
