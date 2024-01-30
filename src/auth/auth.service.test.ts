import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { expect } from 'chai';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let app: INestApplication;
  let authService: AuthService;
  let testUser: { email: any; id: any; fullname: any; password?: string };

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn().mockImplementation((email) => {
              if (email === testUser.email) {
                return Promise.resolve(testUser);
              }
              return Promise.resolve(null);
            }),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);

    await app.init();
  });

  beforeEach(() => {
    testUser = {
      id: 1,
      email: 'test@example.com',
      password: bcrypt.hashSync('password', authService.saltRounds),
      fullname: 'Test User',
    };
  });

  describe('validateUser', () => {
    it('should validate user credentials successfully', async () => {
      const email = 'test@example.com';
      const password = 'password';

      const result = await authService.validateUser(email, password);

      expect(result).to.deep.equal({
        id: testUser.id,
        email: testUser.email,
        fullname: testUser.fullname,
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const email = 'test@example.com';
      const password = 'wrong_password';

      try {
        await authService.validateUser(email, password);
      } catch (error) {
        expect(error).to.be.instanceOf(UnauthorizedException);
        return;
      }
      throw new Error('Expected UnauthorizedException to be thrown');
    });
  });

  after(async () => {
    await app.close();
  });
});
