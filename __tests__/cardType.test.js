import { getCardInfo } from '../src/cardType';

describe('getCardInfo', () => {
  test('detects Visa', () => {
    const info = getCardInfo('4111111111111111');
    expect(info.name).toBe('visa');
  });

  test('detects Mastercard', () => {
    const info = getCardInfo('5105105105105100');
    expect(info.name).toBe('mastercard');
  });

  test('returns undefined for unknown card', () => {
    const info = getCardInfo('9999999999999999');
    expect(info).toBeUndefined();
  });
});