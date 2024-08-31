import { Test, TestingModule } from '@nestjs/testing';
import { S3FileManagerService } from './s3-file-manager.service';

describe('S3FileManagerService', () => {
  let service: S3FileManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3FileManagerService],
    }).compile();

    service = module.get<S3FileManagerService>(S3FileManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
