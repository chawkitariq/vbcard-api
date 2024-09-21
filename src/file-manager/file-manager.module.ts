import { Module } from '@nestjs/common';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { FileManagerService } from './file-manager.service';

@Module({
  imports: [AwsS3Module],
  providers: [FileManagerService],
  exports: [FileManagerService]
})
export class FileManagerModule {}
