import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class FileManagerService {
  constructor(protected readonly s3Service: S3Service) {}

  async upload(file: Buffer, path: string) {
    return this.s3Service.put({
      Bucket: process.env.S3_BUCKET,
      Key: path,
      Body: file
    });
  }

  async download(path: string) {
    return this.s3Service.get({
      Bucket: process.env.S3_BUCKET,
      Key: path
    });
  }

  async delete(path: string) {
    return this.s3Service.delete({
      Bucket: process.env.S3_BUCKET,
      Key: path
    });
  }
}
