import { Module } from '@nestjs/common';
import { S3Module } from 'src/s3/s3.module';
import { FileManagerService } from './file-manager.service';

@Module({
  imports: [S3Module],
  providers: [FileManagerService],
  exports: [FileManagerService]
})
export class FileManagerModule {}
