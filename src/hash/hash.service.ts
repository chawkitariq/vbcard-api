import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  /**
   * Hashes a given value.
   *
   * @param {string} value - The value to be hashed.
   * @param {number} [saltOrRounds] - Optional salt or number of salt rounds. Defaults to environment variable `HASH_SALT_ROUNDS` or 10.
   * @returns {Promise<string>} A promise that resolves with the hashed value.
   */
  async hash(value: string, saltOrRounds = +process.env.HASH_SALT_ROUNDS || 10): Promise<string> {
    return bcrypt.hash(value, saltOrRounds);
  }

  /**
   * Compares a given value with a hashed value to check if they match.
   *
   * @param {string} value - The plain value to compare.
   * @param {string} hash - The hashed value to compare against.
   * @returns {Promise<boolean>} A promise that resolves with `true` if the values match, otherwise `false`.
   */
  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
