import { AuthService } from '@application/api/auth/auth.service';
import { JwtLoginDto } from '@application/api/auth/dto/jwt-login.dto';
import { User } from '@core/domain/user/user.model';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req: Express.Request & { user: User },
  ): Promise<JwtLoginDto> {
    return {
      ...(await this.authService.login(req.user)),
      refreshToken: '',
    };
  }
}
