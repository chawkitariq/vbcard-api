import { Provider } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

export const S3_CLIENT_PROVIDER = 'S3_CLIENT_PROVIDER';

export const S3ClientProvider: Provider = {
  provide: S3_CLIENT_PROVIDER,
  useFactory: () => {
    return new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_DEFAULT_REGION,
      forcePathStyle: !!process.env.S3_FORCE_PATH_STYLE,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
      }
    });
  }
};
