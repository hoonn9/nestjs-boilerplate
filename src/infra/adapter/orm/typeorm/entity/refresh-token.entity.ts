import { RefreshToken } from '@core/domain/user/entity/refresh-token.model';
import { RefreshTokenProperties } from '@core/domain/user/type/refresh-token.type';
import { CoreEntity } from '@infra/adapter/orm/typeorm/common/entity/core.entity';
import { TypeOrmUser } from '@infra/adapter/orm/typeorm/entity/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

@Entity('refresh_token')
export class TypeOrmRefreshToken extends CoreEntity {
  @Column({ type: 'varchar' })
  userAgent: string;

  @RelationId((type: TypeOrmRefreshToken) => type.user)
  @Column({ type: 'uuid' })
  userId: string;

  @Index()
  @ManyToOne((type) => TypeOrmUser, (user) => user.refreshTokens)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: TypeOrmUser | null;

  @Column({ type: 'varchar' })
  token: string;

  static toEntity(model: RefreshToken): TypeOrmRefreshToken {
    const properties = model.get();
    return {
      ...properties,
      userId: properties.user.get().id,
      user: TypeOrmUser.toEntity(properties.user),
    };
  }
}
