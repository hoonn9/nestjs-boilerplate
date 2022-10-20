import { User } from '@core/domain/user/entity/user.model';
import { UserProperties } from '@core/domain/user/type/user.type';
import { Role } from '@core/enum/role.enum';
import { CoreEntity } from '@infra/adapter/orm/typeorm/common/entity/core.entity';
import { TypeOrmRefreshToken } from '@infra/adapter/orm/typeorm/entity/refresh-token.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class TypeOrmUser extends CoreEntity implements UserProperties {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  birthDate: Date | null;

  @Column({ type: 'varchar', unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  password: string | null;

  @Column({ type: 'varchar' })
  role: Role;

  @OneToMany((type) => TypeOrmRefreshToken, (token) => token.user)
  refreshTokens: TypeOrmRefreshToken[] | null;

  static toEntity(model: User): TypeOrmUser {
    const properties = model.get();

    return {
      ...properties,
      refreshTokens: null,
    };
  }
}
