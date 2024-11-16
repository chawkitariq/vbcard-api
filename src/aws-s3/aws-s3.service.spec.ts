import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3Service } from './aws-s3.service';
import { AwsS3Module } from './aws-s3.module';

describe('AwsS3Service', () => {
  let service: AwsS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AwsS3Module]
    }).compile();

    service = module.get(AwsS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
