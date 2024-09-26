import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_TWO_FACTOR_AUTHENTICATION =
  'isSkipTwoFactorAuthentication';
export const SkipTwoFactorAuthentication = () =>
  SetMetadata(IS_SKIP_TWO_FACTOR_AUTHENTICATION, true);
