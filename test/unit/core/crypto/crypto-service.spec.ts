import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { CryptoService } from '../../../../src/core/crypto/crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    cryptoService = testingModule.get(CryptoService);
  });

  describe('AES256', () => {
    const createOptionsByLen = (len: number) => ({
      secret: faker.datatype.string(len),
    });
    it('Should execute encrypt and decrypt', async () => {
      const options = createOptionsByLen(32);

      const plainText = faker.datatype.string(16);
      const encrypted = await cryptoService.encrypt(plainText, options);
      const decrypted = await cryptoService.decrypt(encrypted, options);

      expect(plainText).toEqual(decrypted);
    });

    it.each([1, 5, 12, 16, 24])(
      'When key length is not 32, expect throw RangeError',
      (len) => {
        expect(
          cryptoService.encrypt('', createOptionsByLen(len)),
        ).rejects.toThrowError();
      },
    );

    it('Should be key length is 32', () => {
      expect(
        cryptoService.encrypt('', createOptionsByLen(32)),
      ).resolves.not.toThrow();
    });
  });

  describe('Bcrypt', () => {
    it('Compare Test', async () => {
      const plainText = faker.datatype.string(5);
      const encrypted = await cryptoService.hashByBcrypt(plainText, 10);
      const isValid = await cryptoService.compareByBcrypt(plainText, encrypted);
      expect(isValid).toBe(true);
    });
  });
});
