import { User } from '@core/domain/user/entity/user.model';
import { UserRepositoryPort } from '@core/domain/user/repository/user.repository';
import { Optional } from '@core/type/common';
import { CoreRepository } from '@infra/adapter/orm/typeorm/common/repository/core.repository';
import { TypeOrmUser } from '@infra/adapter/orm/typeorm/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TypeOrmUserRepository
  extends CoreRepository<TypeOrmUser>
  implements UserRepositoryPort
{
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {
    super(userRepository);
  }

  async findByEmailOrPhoneNumber(args: {
    email: string;
    phoneNumber: string;
  }): Promise<User[]> {
    const users = await this.userRepository.find({
      where: [
        {
          email: args.email,
        },
        {
          phoneNumber: args.phoneNumber,
        },
      ],
    });

    return users.map(User.toModel);
  }

  async findById(id: string): Promise<Optional<User>> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user ? User.toModel(user) : null;
  }

  async findByEmailWithPassword(email: string): Promise<Optional<User>> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: [...this.getColumns()],
    });

    return user ? User.toModel(user) : null;
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save(TypeOrmUser.toEntity(user));
  }
}
