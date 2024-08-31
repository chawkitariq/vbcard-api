import { Injectable } from '@nestjs/common';
import { S3FileManagerService } from './s3-file-manager/s3-file-manager.service';

@Injectable()
export class FileManagerService {
  constructor(protected readonly s3FileManagerService: S3FileManagerService) {}

  async upload(file: Buffer, path: string) {
    return this.s3FileManagerService.upload(file, path);
  }

  async download(path: string) {
    return this.s3FileManagerService.download(path);
  }

  async delete(path: string) {
    return this.s3FileManagerService.delete(path);
  }
}
