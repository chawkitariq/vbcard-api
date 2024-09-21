import { Injectable } from '@nestjs/common';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class FileManagerService {
  constructor(protected readonly awsS3Service: AwsS3Service) {}

  async upload(file: Buffer, path: string) {
    return this.awsS3Service.put({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: path,
      Body: file
    });
  }

  async download(path: string) {
    return this.awsS3Service.get({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: path
    });
  }

  async delete(path: string) {
    return this.awsS3Service.delete({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: path
    });
  }
}
