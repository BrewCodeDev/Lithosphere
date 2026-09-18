import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CopyButton from '@/components/CopyButton';
import ErrorState from '@/components/ErrorState';
import { useApi } from '@/lib/api';
import { EXPLORER_TITLE } from '@/lib/constants';
import type { ApiValidatorDetail } from '@/lib/types';

function formatTokens(raw: string) {
  try {
    return (Number(BigInt(raw)) / 1e18).toLocaleString('en-US', {
      maximumFractionDigits: 4,
    });
  } catch {
    return '0';
  }
}

export default function ValidatorDetailPage() {
  const router = useRouter();
  const operatorAddress = typeof router.query.operatorAddress === 'string'
    ? router.query.operatorAddress
    : null;
  const { data, loading, error, refetch } = useApi<ApiValidatorDetail>(
    operatorAddress ? `/validators/${encodeURIComponent(operatorAddress)}` : null
  );

  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (loading || !data) {
    return <div className="card p-8 text-center text-[var(--color-text-muted)]">Loading validator...</div>;
  }

  return (
    <>
      <Head><title>{data.moniker} | {EXPLORER_TITLE}</title></Head>
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-litho-400">Home</Link><span>/</span>
        <Link href="/validators" className="hover:text-litho-400">Validators</Link><span>/</span>
        <span className="truncate">{data.moniker}</span>
      </div>

      <section className="card p-6 mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold">{data.moniker}</h1>
              <span className={data.status === 'Bonded' && !data.jailed ? 'badge-success' : 'badge-warning'}>
                {data.jailed ? 'Jailed' : data.status}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <code className="break-all">{data.address}</code>
              <CopyButton text={data.address} />
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-sm text-[var(--color-text-muted)]">Voting Power</div>
            <div className="text-2xl font-bold">{data.votingPower} LITHO</div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Stat label="Commission" value={data.commission} />
        <Stat label="Max Commission" value={data.commissionMaxRate} />
        <Stat label="Self Delegation" value={`${formatTokens(data.minSelfDelegation)} LITHO`} />
        <Stat label="Uptime" value={data.uptimePercentage == null ? '—' : `${data.uptimePercentage}%`} />
      </div>

      <section className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Validator Information</h2>
        <div className="grid gap-x-8 md:grid-cols-2">
          <Detail label="Operator Address" value={data.address} mono />
          <Detail label="Consensus Address" value={data.consensusAddress} mono />
          <Detail label="Total Staked" value={`${formatTokens(data.tokens)} LITHO`} />
          <Detail label="Delegator Shares" value={formatTokens(data.delegatorShares)} />
          <Detail label="Max Commission Change" value={data.commissionMaxChange} />
          <Detail label="Missed Blocks" value={data.missedBlocks ?? '—'} />
          {data.website && (
            <Detail label="Website" value={data.website} link />
          )}
          {data.identity && <Detail label="Identity" value={data.identity} />}
        </div>
        {data.details && (
          <div className="mt-4 pt-4 border-t border-[var(--color-border-light)]">
            <div className="detail-label mb-2">Details</div>
            <p className="text-sm whitespace-pre-wrap">{data.details}</p>
          </div>
        )}
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-5">
      <div className="text-sm text-[var(--color-text-muted)] mb-1">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Detail({ label, value, mono, link }: { label: string; value: string | null; mono?: boolean; link?: boolean }) {
  return (
    <div className="detail-row">
      <div className="detail-label">{label}</div>
      <div className={`detail-value ${mono ? 'font-mono' : ''}`}>
        {link && value ? <a href={value} target="_blank" rel="noreferrer">{value}</a> : value || '—'}
      </div>
    </div>
  );
}
