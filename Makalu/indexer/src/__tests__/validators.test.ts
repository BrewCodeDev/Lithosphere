import { bech32 } from 'bech32';
import { describe, expect, it } from 'vitest';

import { consensusAddressFromPublicKey, signingUptime } from '../validators.js';

describe('validator metrics', () => {
  it('derives a Cosmos consensus address from an ed25519 public key', () => {
    const address = consensusAddressFromPublicKey({
      '@type': '/cosmos.crypto.ed25519.PubKey',
      key: Buffer.alloc(32, 7).toString('base64'),
    });

    expect(address).toMatch(/^lithovalcons1/);
    const decoded = bech32.decode(address!);
    expect(Buffer.from(bech32.fromWords(decoded.words))).toHaveLength(20);
  });

  it('calculates and bounds signing-window uptime', () => {
    expect(signingUptime('12', '1000')).toBe(98.8);
    expect(signingUptime('2000', '1000')).toBe(0);
    expect(signingUptime('0', '1000')).toBe(100);
    expect(signingUptime('1', '1000', '10')).toBe(90);
    expect(signingUptime('12', '0')).toBeNull();
  });
});
