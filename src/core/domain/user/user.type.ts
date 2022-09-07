export type UserRequiredProperties = Required<{
  readonly id: string;
}>;

export type UserPartialProperties = Partial<{
  readonly password: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}>;

export type UserConstructorProperties = UserRequiredProperties &
  UserPartialProperties;

export type UserProperties = UserRequiredProperties &
  Required<UserPartialProperties>;
