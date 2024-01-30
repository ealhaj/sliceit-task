import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'auth/auth.guard';
import { UsersService } from './users.service';
import { TUser } from './users.types';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() data: TUser) {
    this.usersService.createOne(data);

    return {
      success: true,
      data: {},
    };
  }

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  async show(@Session() session: Record<string, any>) {
    const info = await this.usersService.findOneById(session.userId);

    return {
      success: true,
      data: {
        fullname: info.fullname,
        email: info.email,
      },
    };
  }
}
