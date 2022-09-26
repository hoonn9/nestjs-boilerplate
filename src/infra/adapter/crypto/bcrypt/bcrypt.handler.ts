import { CryptoHandler } from '@core/common/handler/crypto/crypto.handler';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptCryptoHandler implements CryptoHandler {
  private readonly saltRounds = 10;

  public async hash(plainText: string): Promise<string> {
    const hashed = await bcrypt.hash(plainText, this.saltRounds);
    return hashed;
  }

  public async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}
