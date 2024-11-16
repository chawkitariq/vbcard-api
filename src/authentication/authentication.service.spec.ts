import { AuthenticationService } from './authentication.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TestBed, Mocked } from '@suites/unit';
import { User } from 'src/user/entities/user.entity';
import { AuthenticationRegisterEvent } from './events/authentication-register.event';

describe('AuthenticationService', () => {
  let userService: Mocked<UserService>;
  let jwtService: Mocked<JwtService>;
  let hashService: Mocked<HashService>;
  let eventEmitter: Mocked<EventEmitter2>;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(
      AuthenticationService
    ).compile();

    authenticationService = unit;

    userService = unitRef.get(UserService);
    jwtService = unitRef.get(JwtService);
    hashService = unitRef.get(HashService);
    eventEmitter = unitRef.get(EventEmitter2);
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined();
  });

  describe('register', () => {
    const authenticationRegisterDto = {
      email: 'user@email.test',
      password: 'password'
    };

    // it('should throw ConflictException if user already exists', async () => {
    //   userService.existsBy.mockResolvedValue(true);

    //   await expect(
    //     authenticationService.register(authenticationRegisterDto)
    //   ).rejects.toThrow(ConflictException);
    // });

    it('should hash password', async () => {
      const hashedPassword = 'hashedPassword';
      hashService.hash.mockResolvedValue(hashedPassword);

      userService.create.mockResolvedValue(new User());

      await authenticationService.register(authenticationRegisterDto);

      expect(hashService.hash).toHaveBeenCalledWith(
        authenticationRegisterDto.password
      );
    });

    it('should trigger AuthenticationRegisterEvent on successfull registration', async () => {
      eventEmitter.emit.mockImplementation();

      const userFixture = new User();
      userService.create.mockResolvedValue(userFixture);

      await authenticationService.register(authenticationRegisterDto);

      expect(eventEmitter.emit).toHaveBeenCalledWith(
        AuthenticationRegisterEvent.name,
        new AuthenticationRegisterEvent(userFixture.id)
      );
    });

    it('should create new user', async () => {
      hashService.hash.mockResolvedValue(authenticationRegisterDto.password);

      const userFixture = new User();
      userService.create.mockResolvedValue(userFixture);

      const newUser = await authenticationService.register(
        authenticationRegisterDto
      );

      expect(userService.create).toHaveBeenCalledWith(
        authenticationRegisterDto
      );

      expect(newUser).toEqual(userFixture);
    });
  });

  describe('register', () => {
    const authenticationRegisterDto = {
      email: 'user@email.test',
      password: 'password'
    };
  });
});
