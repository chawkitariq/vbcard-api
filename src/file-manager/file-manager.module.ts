import { Module } from '@nestjs/common';
import { S3Module } from 'src/s3/s3.module';
import { S3FileManagerService } from './s3-file-manager/s3-file-manager.service';
import { FileManagerService } from './file-manager.service';

@Module({
  imports: [S3Module],
  providers: [S3FileManagerService, FileManagerService],
  exports: [S3FileManagerService, FileManagerService]
})
export class FileManagerModule {}
