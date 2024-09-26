import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_JWT_AUTHENTICATION = 'isSkipJwtAuthentication';
export const SkipJwtAuthentication = () =>
  SetMetadata(IS_SKIP_JWT_AUTHENTICATION, true);
