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
    it('should execute encrypt and decrypt', async () => {
      const options = {
        secret: faker.datatype.string(32),
      };
      const plainText = faker.datatype.string(16);
      const encrypted = await cryptoService.encrypt(plainText, options);
      const decrypted = await cryptoService.decrypt(encrypted, options);

      expect(plainText).toEqual(decrypted);
    });
  });
});
