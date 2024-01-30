import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import supertest from 'supertest';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: INestApplication;

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue({
              id: 1,
              email: 'test@example.com',
              password: 'hashed_password', // You can use a dummy hashed password
            }),
            saveSession: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  describe('login', () => {
    it('should login and return a token', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password',
      };

      const response = await supertest(app.getHttpServer())
        .post('/login')
        .send(userData)
        .expect(HttpStatus.OK);

      expect(response.body).to.have.property('success', true);
      expect(response.body.data).to.have.property('token');
    });
  });

  describe('logout', () => {
    it('should logout and return success', async () => {
      const response = await supertest(app.getHttpServer())
        .delete('/logout')
        .expect(HttpStatus.OK);

      expect(response.body).to.have.property('success', true);
    });
  });

  after(async () => {
    await app.close();
  });
});
