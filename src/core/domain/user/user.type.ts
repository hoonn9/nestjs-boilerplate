import { Role } from '@core/enum/role.enum';

export type UserRequiredProperties = Required<{
  readonly id: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly role: Role;
}>;

export type UserPartialProperties = Partial<{
  readonly password: string | null;
  readonly birthDate: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}>;

export type UserConstructorProperties = UserRequiredProperties &
  UserPartialProperties;

export type UserProperties = UserRequiredProperties &
  Required<UserPartialProperties>;
