import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect } from 'chai';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let app: INestApplication;
  let usersService: UsersService;

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersService = moduleFixture.get<UsersService>(UsersService);

    await app.init();
  });

  describe('createOne', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        fullname: 'Test User',
        password: 'password',
      };

      const createdUser = await usersService.createOne(userData);

      expect(createdUser).to.have.property('id');
      expect(createdUser.email).to.equal(userData.email);
      expect(createdUser.fullname).to.equal(userData.fullname);
    });
  });

  after(async () => {
    await app.close();
  });
});
