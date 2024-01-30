import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthGuard } from 'auth/auth.guard';
import { expect } from 'chai';
import supertest from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let app: INestApplication;

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            createOne: jest.fn(),
            findOneById: jest.fn().mockImplementation((id) => {
              if (id === 1) {
                return Promise.resolve({
                  id: 1,
                  email: 'test@example.com',
                  fullname: 'Test User',
                });
              }
              return Promise.resolve(null);
            }),
          },
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(null)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        fullname: 'Test User',
        password: 'password',
      };

      const response = await supertest(app.getHttpServer())
        .post('/register')
        .send(userData)
        .expect(HttpStatus.CREATED);

      expect(response.body).to.deep.equal({
        success: true,
        data: {},
      });
    });
  });

  describe('show', () => {
    it('should return user profile', async () => {
      const userId = 1;

      const response = await supertest(app.getHttpServer())
        .get('/profile')
        .set('Cookie', [`session_id=${userId}`])
        .expect(HttpStatus.OK);

      expect(response.body).to.deep.equal({
        success: true,
        data: {
          fullname: 'Test User',
          email: 'test@example.com',
        },
      });
    });
  });

  after(async () => {
    await app.close();
  });
});
