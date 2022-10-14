import { User } from '@core/domain/user/user.model';
import { UserProperties } from '@core/domain/user/user.type';
import { Role } from '@core/enum/role.enum';
import { CoreEntity } from '@infra/adapter/orm/typeorm/common/entity/core.entity';
import { Column, Entity } from 'typeorm';

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

  static toEntity(model: User): TypeOrmUser {
    const properties = model.get();

    return {
      ...properties,
    };
  }
}
