import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { generateToken } from 'common/security';
import { Request } from 'express';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TLoginParams } from './auth.types';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: TLoginParams,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.validateUser(email, password);

    const token = await generateToken(session.id);

    this.authService.saveSession(user.id, token, session);

    return {
      success: true,
      data: {
        token: token,
      },
    };
  }

  @UseGuards(LocalAuthGuard)
  @Delete('logout')
  async logout(@Req() req: Request) {
    req.session.destroy(() => {});

    return {
      success: true,
      data: {},
    };
  }
}
