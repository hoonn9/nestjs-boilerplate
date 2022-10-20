import { AuthService } from '@application/api/auth/auth.service';
import { AuthInjectToken } from '@application/api/auth/auth.token';
import { JwtRefreshGuard } from '@application/api/auth/guard/jwt-refresh.guard';
import { UserModelDto } from '@core/domain/user/dto/user.dto';
import { User } from '@core/domain/user/entity/user.model';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard(AuthInjectToken.LocalStrategy.toString()))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() req: Express.Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserModelDto> {
    return this.authService.login(req.user, res);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh() {}
}
