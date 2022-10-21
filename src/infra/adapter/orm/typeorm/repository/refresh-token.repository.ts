import { RefreshToken } from '@core/domain/user/entity/refresh-token.model';
import { User } from '@core/domain/user/entity/user.model';
import { RefreshTokenRepositoryPort } from '@core/domain/user/repository/refresh-token.repository';
import { Optional } from '@core/type/common';
import { CoreRepository } from '@infra/adapter/orm/typeorm/common/repository/core.repository';
import { TypeOrmRefreshToken } from '@infra/adapter/orm/typeorm/entity/refresh-token.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TypeOrmRefreshTokenRepository
  extends CoreRepository<TypeOrmRefreshToken>
  implements RefreshTokenRepositoryPort
{
  constructor(
    @InjectRepository(TypeOrmRefreshToken)
    private readonly refreshTokenRepository: Repository<TypeOrmRefreshToken>,
  ) {
    super(refreshTokenRepository);
  }
  async findByToken(args: {
    user: User;
    token: string;
  }): Promise<Optional<RefreshToken>> {
    const entity = await this.refreshTokenRepository.findOne({
      where: {
        userId: args.user.get().id,
        token: args.token,
      },
      relations: {
        user: true,
      },
    });

    if (!entity) {
      return null;
    }

    if (!entity.user) {
      throw new InternalServerErrorException();
    }

    return RefreshToken.toModel({
      ...entity,
      user: User.toModel(entity.user),
    });
  }

  async save(refreshToken: RefreshToken): Promise<void> {
    const entity = TypeOrmRefreshToken.toEntity(refreshToken);
    await this.refreshTokenRepository.save(entity);
  }
}
