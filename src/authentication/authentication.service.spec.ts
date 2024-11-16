import { AuthenticationService } from './authentication.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/user/entities/user.entity';
import { Test } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('AuthenticationService', () => {
  let userService: DeepMocked<UserService>;
  let hashService: DeepMocked<HashService>;
  let eventEmitter: DeepMocked<EventEmitter2>;

  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UserService,
          useValue: createMock<UserService>()
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>()
        },
        {
          provide: HashService,
          useValue: createMock<HashService>()
        },
        {
          provide: EventEmitter2,
          useValue: createMock<EventEmitter2>()
        }
      ]
    }).compile();

    authenticationService = module.get(AuthenticationService);

    userService = module.get(UserService);
    hashService = module.get(HashService);
    eventEmitter = module.get(EventEmitter2);
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined();
  });

  describe('register', () => {
    const authenticationRegisterDto = {
      email: 'user@email.test',
      password: 'password'
    };

    it('should hash password', async () => {
      const hashedPassword = 'hashedPassword';
      hashService.hash.mockResolvedValue(hashedPassword);

      await authenticationService.register(authenticationRegisterDto);

      expect(hashService.hash).toHaveBeenCalledWith(
        authenticationRegisterDto.password
      );
      expect(userService.create).toHaveBeenCalledWith({
        email: authenticationRegisterDto.email,
        password: hashedPassword
      });
    });

    it('should trigger register event on successfull registration', async () => {
      await authenticationService.register(authenticationRegisterDto);

      expect(eventEmitter.emit).toHaveBeenCalled();
    });

    it('should create new user', async () => {
      const hashedPassword = 'hashedPassword';
      hashService.hash.mockResolvedValue(hashedPassword);
      const userFixture = new User();
      userService.create.mockResolvedValue(userFixture);

      const newUser = await authenticationService.register(
        authenticationRegisterDto
      );

      expect(userService.create).toHaveBeenCalledWith({
        email: authenticationRegisterDto.email,
        password: hashedPassword
      });
      expect(newUser).toEqual(userFixture);
    });
  });

  describe('login', () => {
    it('should create new user', async () => {
      const userFixture = new User();

      const newUser = await authenticationService.login(userFixture);

      expect(newUser).not.toBeNull();
      expect(newUser).toBeDefined();
      expect(newUser?.access_token).toBeDefined();
      expect(newUser?.token_type).toBeDefined();
      expect(newUser?.expires_in).toBeDefined();
    });
  });
});
