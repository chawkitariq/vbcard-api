import { Inject, Injectable } from '@nestjs/common';
import { AWS_S3_CLIENT_PROVIDER } from './aws-s3-client.provider';
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client
} from '@aws-sdk/client-s3';

@Injectable()
export class AwsS3Service {
  constructor(
    @Inject(AWS_S3_CLIENT_PROVIDER)
    protected readonly awsS3Client: S3Client
  ) {}

  async put(request: PutObjectCommandInput) {
    return this.awsS3Client.send(new PutObjectCommand(request));
  }

  async get(request: GetObjectCommandInput) {
    return this.awsS3Client.send(new GetObjectCommand(request));
  }

  async delete(request: DeleteObjectCommandInput) {
    return this.awsS3Client.send(new DeleteObjectCommand(request));
  }
}
