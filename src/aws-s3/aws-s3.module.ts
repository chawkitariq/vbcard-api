import { Module } from '@nestjs/common';
import { AwsS3ClientProvider } from './aws-s3-client.provider';
import { AwsS3Service } from './aws-s3.service';

@Module({
  providers: [AwsS3ClientProvider, AwsS3Service],
  exports: [AwsS3ClientProvider, AwsS3Service]
})
export class AwsS3Module {}
