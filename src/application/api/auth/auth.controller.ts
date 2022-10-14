import { AuthService } from '@application/api/auth/auth.service';
import { UserModelDto } from '@core/domain/user/user.dto';
import { User } from '@core/domain/user/user.model';
import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Req() req: Express.Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserModelDto> {
    return this.authService.login(req.user, res);
  }
}
