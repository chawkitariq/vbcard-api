import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_VERIFICATION = 'isSkipVerification';
export const SkipVerification = () => SetMetadata(IS_SKIP_VERIFICATION, true);
