import { AuthenticationService } from './authentication.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TestBed, Mocked } from '@suites/unit';
import { User } from 'src/user/entities/user.entity';
import { ConflictException } from '@nestjs/common';

describe('AuthenticationService', () => {
  describe('isolated', () => {
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

      it('should throw ConflictException if user already exists', async () => {
        userService.existsBy.mockResolvedValue(true);

        await expect(
          authenticationService.register(authenticationRegisterDto)
        ).rejects.toThrow(ConflictException);
      });

      it('should register new user', async () => {
        const userFixture = new User();

        userService.create.mockResolvedValue(userFixture);
        hashService.hash.mockResolvedValue(authenticationRegisterDto.password);

        const newUser = await authenticationService.register(
          authenticationRegisterDto
        );

        expect(userService.create).toHaveBeenCalledWith(
          authenticationRegisterDto
        );

        expect(newUser).toEqual(userFixture);
      });
    });
  });
});
