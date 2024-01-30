import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  saltRounds = 10;

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user.password);
    console.log(password);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return { id: user.id, email: user.email, fullname: user.fullname };
  }

  async saveSession(
    userId: number,
    token: string,
    session: Record<string, any>,
  ) {
    session.userId = userId;
    session.token = token;
    await session.save();
  }
}
