import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserService } from 'src/user/user.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ConflictException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;
  let authenticationService: DeepMocked<AuthenticationService>;
  let userService: DeepMocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationController,
        {
          provide: AuthenticationService,
          useValue: createMock<AuthenticationService>()
        },
        {
          provide: UserService,
          useValue: createMock<UserService>()
        }
      ]
    }).compile();

    authenticationController = module.get(AuthenticationController);
    authenticationService = module.get(AuthenticationService);
    userService = module.get(UserService);
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
      userService.existsBy.mockResolvedValue(false);

      await authenticationController.register(authenticationRegisterDto);

      expect(authenticationService.register).toHaveBeenCalledWith(
        authenticationRegisterDto
      );
    });

    it('should throw ConflictException if user already exists', async () => {
      userService.existsBy.mockResolvedValue(true);

      const register = authenticationController.register(
        authenticationRegisterDto
      );

      await expect(register).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const userFixture = new User();
      await authenticationController.login(userFixture);

      expect(authenticationService.login).toHaveBeenCalledWith(userFixture);
    });
  });
});
