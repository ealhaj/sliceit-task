import { User } from './user.entity';

export type TUser = {
  email: User['email'];
  fullname: User['fullname'];
  password: User['password'];
};
