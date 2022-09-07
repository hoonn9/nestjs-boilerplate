import { User } from '@core/domain/user/user.model';
import { UserRepositoryPort } from '@core/domain/user/user.repository';
import { Optional } from '@core/type/common';
import { TypeOrmUser } from '@infra/adapter/orm/typeorm/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TypeOrmUserRepository implements UserRepositoryPort {
  constructor(
    // @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}

  async newId(): Promise<string> {
    const emptyEntity = new TypeOrmUser();
    const entity = await this.userRepository.save(emptyEntity);
    return entity.id;
  }
  async findById(id: string): Promise<Optional<User>> {
    const entity = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return entity ? User.toModel(entity) : null;
  }
  async save(user: User): Promise<void> {
    await this.userRepository.save(TypeOrmUser.toEntity(user));
  }
}
