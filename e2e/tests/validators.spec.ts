import { expect, test } from '@playwright/test';

const operatorAddress = 'lithovaloper1hg4klgm4s2tv2gmjxke27waz49knd2rq5tzfcw';

const validator = {
  address: operatorAddress,
  moniker: 'Lithosphere Foundation',
  votingPower: '125,000',
  commission: '5%',
  status: 'Bonded',
  tokens: '125000000000000000000000',
  uptimePercentage: 99.92,
  missedBlocks: '4',
  jailed: false,
  updatedAt: '2026-09-19T10:00:00.000Z',
};

test.describe('Validator explorer', () => {
  test('renders chain metrics, charts, filters, and validator rows', async ({ page }) => {
    await page.route('**/api/validators?*', (route) => route.fulfill({ json: [validator] }));
    await page.goto('/validators');

    await expect(page.getByRole('heading', { name: 'Validators' })).toBeVisible();
    await expect(page.getByText('Voting power distribution')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Signing health' })).toBeVisible();
    await expect(page.getByRole('link', { name: validator.moniker }).last()).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Sort validators' })).toBeVisible();
  });

  test('renders validator profile, real signing metrics, and staking details', async ({ page }) => {
    await page.route(`**/api/validators/${operatorAddress}`, (route) => route.fulfill({
      json: {
        ...validator,
        consensusAddress: 'lithovalcons1x39m3n0example',
        identity: null,
        website: 'https://litho.ai',
        securityContact: 'security@litho.ai',
        details: 'Lithosphere mainnet validator',
        delegatorShares: validator.tokens,
        minSelfDelegation: '1000000000000000000',
        commissionMaxRate: '20%',
        commissionMaxChange: '1%',
        rank: 1,
        votingPowerPercentage: 25.5,
        profileImageUrl: null,
      },
    }));
    await page.goto(`/validators/${operatorAddress}`);

    await expect(page.getByRole('heading', { name: validator.moniker })).toBeVisible();
    await expect(page.getByText('99.92%', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('25.50% of active voting power')).toBeVisible();
    await expect(page.getByText('security@litho.ai')).toBeVisible();
  });
});
