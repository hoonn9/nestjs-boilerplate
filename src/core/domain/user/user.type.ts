export type UserRequiredProperties = Required<{
  readonly id: string;
  readonly email: string;
  readonly phoneNumber: string;
}>;

export type UserPartialProperties = Partial<{
  readonly password: string | null;
  readonly birthDate: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}>;

export type UserConstructorProperties = Omit<UserRequiredProperties, 'id'> &
  UserPartialProperties;

export type UserProperties = UserRequiredProperties &
  Required<UserPartialProperties>;
