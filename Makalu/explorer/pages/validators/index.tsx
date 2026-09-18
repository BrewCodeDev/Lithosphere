import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import ErrorState from '@/components/ErrorState';
import { useApi } from '@/lib/api';
import { EXPLORER_TITLE } from '@/lib/constants';
import { formatNumber } from '@/lib/format';
import type { ApiValidator } from '@/lib/types';

function statusIsActive(v: ApiValidator) {
  return !v.jailed && (v.status === 'Bonded' || v.status === 'active' || v.status === 'BOND_STATUS_BONDED');
}

function uptime(v: ApiValidator) {
  return v.uptimePercentage == null ? null : Number(v.uptimePercentage);
}

export default function ValidatorsPage() {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('all');
  const path = `/validators?${new URLSearchParams({
    ...(search ? { search } : {}),
    ...(sector === 'uptime' ? { sector: 'uptime' } : {}),
    ...(sector === 'commission' ? { sort: 'commission' } : {}),
    metrics: '1',
  }).toString()}`;
  const { data, loading, error, refetch } = useApi<ApiValidator[]>(path);
  const validators = data ?? [];
  const active = validators.filter(statusIsActive).length;
  const totalStake = validators.reduce((sum, v) => sum + Number(v.tokens ?? 0) / 1e18, 0);
  const avgUptime = useMemo(() => {
    const values = validators.map(uptime).filter((v): v is number => v != null);
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
  }, [validators]);

  return (
    <>
      <Head>
        <title>Validators | {EXPLORER_TITLE}</title>
        <meta name="description" content="Explore Lithosphere mainnet validators, stake, uptime, commission, and validator health." />
      </Head>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 text-sm font-medium uppercase tracking-wider text-litho-400">Network security</div>
          <h1 className="text-3xl font-bold">Validators</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Browse the active set and validator health on Lithosphere.</p>
        </div>
        <Link href="/validators" className="text-sm text-[var(--color-text-muted)] hover:text-litho-400">Refresh data</Link>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Validators" value={String(validators.length)} detail={`${active} active`} />
        <Metric label="Total stake" value={`${formatNumber(Math.round(totalStake))} LITHO`} detail="indexed voting power" />
        <Metric label="Average uptime" value={avgUptime == null ? '—' : `${avgUptime.toFixed(2)}%`} detail="reported by chain" />
      </div>

      <div className="card mb-5 flex flex-col gap-3 p-4 sm:flex-row">
        <input
          aria-label="Search validators"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by moniker or operator address"
          className="min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm outline-none focus:border-litho-400"
        />
        <select value={sector} onChange={(e) => setSector(e.target.value)} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm">
          <option value="all">All validators</option>
          <option value="uptime">Best uptime</option>
          <option value="commission">Lowest commission</option>
        </select>
      </div>

      {error ? <ErrorState message={error} onRetry={refetch} /> : (
        <div className="card overflow-x-auto">
          <table className="data-table min-w-[760px]">
            <thead><tr><th>#</th><th>Validator</th><th>Voting power</th><th>Uptime</th><th>Commission</th><th>Missed blocks</th><th>Status</th></tr></thead>
            <tbody>
              {loading && Array.from({ length: 5 }).map((_, i) => <tr key={i}><td colSpan={7}><div className="h-4 w-2/3 animate-pulse rounded bg-[var(--color-bg-tertiary)]" /></td></tr>)}
              {!loading && validators.map((v, i) => {
                const value = uptime(v);
                return (
                  <tr key={v.address}>
                    <td className="text-[var(--color-text-muted)]">{i + 1}</td>
                    <td><Link href={`/validators/${encodeURIComponent(v.address)}`} className="font-medium hover:underline">{v.moniker || v.address}</Link><div className="font-mono text-xs text-[var(--color-text-muted)]">{v.address.slice(0, 12)}...{v.address.slice(-6)}</div></td>
                    <td className="font-mono">{v.votingPower} LITHO</td>
                    <td>{value == null ? '—' : <HealthBar value={value} />}</td>
                    <td>{v.commission || '—'}</td>
                    <td>{v.missedBlocks ?? '—'}</td>
                    <td><span className={statusIsActive(v) ? 'badge-success' : 'badge-neutral'}>{v.jailed ? 'Jailed' : v.status}</span></td>
                  </tr>
                );
              })}
              {!loading && validators.length === 0 && <tr><td colSpan={7} className="py-10 text-center text-[var(--color-text-muted)]">No validators match this filter.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="card p-4"><div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{label}</div><div className="mt-2 text-xl font-semibold">{value}</div><div className="mt-1 text-xs text-[var(--color-text-secondary)]">{detail}</div></div>;
}

function HealthBar({ value }: { value: number }) {
  const color = value >= 99 ? 'bg-emerald-500' : value >= 95 ? 'bg-amber-500' : 'bg-red-500';
  return <div className="flex items-center gap-2"><div className="h-1.5 w-20 rounded-full bg-[var(--color-bg-tertiary)]"><div className={`h-1.5 rounded-full ${color}`} style={{ width: `${Math.max(2, Math.min(100, value))}%` }} /></div><span className="text-xs">{value.toFixed(2)}%</span></div>;
}
