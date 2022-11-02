import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async hashByBcrypt(plainText: string, saltRounds: number): Promise<string> {
    const hashed = await bcrypt.hash(plainText, saltRounds);
    return hashed;
  }

  async compareByBcrypt(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  async hashBySha256(plainText: string) {
    const hash = crypto.createHash('sha256');
    hash.update(plainText);
    return hash.digest('hex');
  }

  async encrypt(
    plainText: string,
    options: { secret: string },
  ): Promise<string> {
    // encrypt aes256 with secret
    const secretToByte = Buffer.from(options.secret, 'utf8');
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv('aes-256-cbc', secretToByte, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    const final = cipher.final('base64');
    encrypted += final;

    return encrypted;
  }

  async decrypt(
    encryptedText: string,
    options: { secret: string },
  ): Promise<string> {
    // decrypt aes256 with secret
    const secretToByte = Buffer.from(options.secret, 'utf8');
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretToByte, iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    const final = decipher.final('utf8');
    decrypted += final;

    return decrypted;
  }
}
