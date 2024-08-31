import { Inject, Injectable } from '@nestjs/common';
import { S3_CLIENT_PROVIDER } from './s3-client.provider';
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
export class S3Service {
  constructor(
    @Inject(S3_CLIENT_PROVIDER)
    protected readonly s3Client: S3Client
  ) {}

  async put(request: PutObjectCommandInput) {
    return this.s3Client.send(new PutObjectCommand(request));
  }

  async get(request: GetObjectCommandInput) {
    return this.s3Client.send(new GetObjectCommand(request));
  }

  async delete(request: DeleteObjectCommandInput) {
    return this.s3Client.send(new DeleteObjectCommand(request));
  }
}
