import { User } from '@core/domain/user/entity/user.model';

export type RefreshTokenRequiredProperties = Required<{
  readonly id: string;
  readonly token: string;
  readonly user: User;
}>;

export type RefreshTokenPartialProperties = Partial<{
  readonly createdAt: Date;
  readonly updatedAt: Date;
}>;

export type RefreshTokenConstructorProperties = RefreshTokenRequiredProperties &
  RefreshTokenPartialProperties;

export type RefreshTokenProperties = RefreshTokenRequiredProperties &
  Required<RefreshTokenPartialProperties>;

export type RefreshTokenUpdateProperties = Partial<
  Pick<RefreshTokenRequiredProperties, 'token'>
>;
