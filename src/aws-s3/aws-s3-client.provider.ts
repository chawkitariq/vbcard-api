import { Provider } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

export const AWS_S3_CLIENT_PROVIDER = 'AWS_S3_CLIENT_PROVIDER';

export const AwsS3ClientProvider: Provider = {
  provide: AWS_S3_CLIENT_PROVIDER,
  useFactory: () => {
    return new S3Client({
      endpoint: process.env.AWS_S3_ENDPOINT,
      region: process.env.AWS_S3_DEFAULT_REGION,
      forcePathStyle: !!process.env.AWS_S3_FORCE_PATH_STYLE,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
      }
    });
  }
};
