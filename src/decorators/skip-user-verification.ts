import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_USER_VERIFICATION = 'isSkipUserVerification';
export const SkipUserVerification = () =>
  SetMetadata(IS_SKIP_USER_VERIFICATION, true);
