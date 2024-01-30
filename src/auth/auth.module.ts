import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
