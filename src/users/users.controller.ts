import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'auth/auth.guard';
import { UsersService } from './users.service';
import { TUser } from './users.types';

@Controller('users')
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
  @Get(':uuid')
  async show(
    @Param('uuid') uuid: string,
    @Session() session: Record<string, any>,
  ) {
    console.log(uuid); // To be implemented in the new feature branch
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
