import { CryptoHandler } from '@core/common/handler/crypto/crypto.handler';
import bcrypt from 'bcrypt';

export class BcryptCryptoHandler implements CryptoHandler {
  private readonly saltRounds = 10;

  async hash(plainText: string): Promise<string> {
    const hashed = await bcrypt.hash(plainText, this.saltRounds);
    return hashed;
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}
