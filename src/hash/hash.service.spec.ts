import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';

describe('HashService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService]
    }).compile();

    service = module.get(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should use default hash salt rounds if none are provided', async () => {
      const plain = 'hash';
      const hash = await service.hash(plain);
      const round = +hash.split('$').filter((v) => v)[1];

      expect(round).toBeDefined();
    });

    it('should hashed value with a salt rounds to 5', async () => {
      const plain = 'hash';
      const hash = await service.hash(plain, 5);
      const round = +hash.split('$').filter((v) => v)[1];

      expect(round).toEqual(5);
    });
  });

  describe('compare', () => {
    it('should be thruty if raw value and hash are convertible', async () => {
      const hash = await service.hash('hash');
      const result = await service.compare('hash', hash);

      expect(result).toBeTruthy();
    });

    it('should be falsy if raw value and hash are not convertible', async () => {
      const hash = await service.hash('hash');
      const result = await service.compare('nohash', hash);

      expect(result).toBeFalsy();
    });
  });
});
