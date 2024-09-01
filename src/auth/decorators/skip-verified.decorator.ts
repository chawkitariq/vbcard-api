import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_VERIFIED_KEY = 'isSkipVerified';
export const SkipVerified = () => SetMetadata(IS_SKIP_VERIFIED_KEY, true);
