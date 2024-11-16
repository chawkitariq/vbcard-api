import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ConflictException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;
  let userService: UserService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    authenticationController = module.get(AuthenticationController);

    userService = module.get(UserService);
    dataSource = module.get(DataSource);
  });

  afterEach(async () => {
    await dataSource.synchronize(true);
  });

  it('should be defined', () => {
    expect(authenticationController).toBeDefined();
  });

  describe('register', () => {
    const authenticationRegisterDto = {
      email: 'user@email.test',
      password: 'password'
    };

    it('should register new user', async () => {
      await authenticationController.register(authenticationRegisterDto);

      const registeredUser = await userService.findOne({
        email: authenticationRegisterDto.email
      });

      expect(registeredUser).toBeDefined();
      expect(registeredUser.email).toEqual(authenticationRegisterDto.email);
    });

    it('should throw ConflictException if user already exists', async () => {
      await authenticationController.register(authenticationRegisterDto);
      const register = authenticationController.register(
        authenticationRegisterDto
      );

      await expect(register).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const userFixture = new User();

      const response = await authenticationController.login(userFixture);

      expect(response).not.toBeNull();
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Object);
    });
  });
});
