import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async hash(plainText: string, saltRounds: number): Promise<string> {
    const hashed = await bcrypt.hash(plainText, saltRounds);
    return hashed;
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
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
