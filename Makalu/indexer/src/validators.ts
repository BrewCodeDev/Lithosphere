import { createHash } from 'crypto';

import { bech32 } from 'bech32';

type ConsensusPublicKey = { key?: string };

export interface SigningInfo {
  address: string;
  index_offset?: string;
  missed_blocks_counter?: string;
}

export function consensusAddressFromPublicKey(
  publicKey: unknown,
  prefix = 'lithovalcons',
): string | null {
  if (!publicKey || typeof publicKey !== 'object') return null;
  const key = (publicKey as ConsensusPublicKey).key;
  if (!key || typeof key !== 'string') return null;

  try {
    const keyBytes = Buffer.from(key, 'base64');
    if (keyBytes.length === 0) return null;
    const addressBytes = createHash('sha256').update(keyBytes).digest().subarray(0, 20);
    return bech32.encode(prefix, bech32.toWords(addressBytes));
  } catch {
    return null;
  }
}

export function signingUptime(
  missedBlocks: string | number | undefined,
  signedBlocksWindow: string | number | undefined,
  indexOffset?: string | number,
): number | null {
  const missed = Number(missedBlocks);
  const window = Number(signedBlocksWindow);
  if (!Number.isFinite(missed) || !Number.isFinite(window) || window <= 0) return null;
  const offset = Number(indexOffset);
  const observed = Number.isFinite(offset) && offset > 0 ? Math.min(window, offset) : window;
  const percentage = ((observed - Math.max(0, missed)) / observed) * 100;
  return Math.round(Math.max(0, Math.min(100, percentage)) * 100) / 100;
}

export function signingInfoByAddress(infos: SigningInfo[]): Map<string, SigningInfo> {
  return new Map(infos.map((info) => [info.address.toLowerCase(), info]));
}
