import { AuthService } from '@application/api/auth/auth.service';
import { AuthLocalGuard } from '@application/api/auth/guard/auth-local.guard';
import { JwtRefreshGuard } from '@application/api/auth/guard/jwt-refresh.guard';
import { JwtToken } from '@application/api/auth/type/jwt.type';
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
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthLocalGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() req: Express.Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserModelDto> {
    return this.authService.login(req.user, res);
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Express.Request & { refresh: JwtToken },
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.setRefreshToken(res, req.refresh);
    return 'ok';
  }
}
