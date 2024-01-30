import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'common/security';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { TUser } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createOne({ email, fullname, password }: TUser): Promise<any> {
    const user = new User();
    user.email = email;
    user.fullname = fullname;
    user.password = await hashPassword(password);

    return this.usersRepository.save(user);
  }
}
