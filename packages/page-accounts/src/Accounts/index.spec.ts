// Copyright 2017-2021 @polkadot/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { screen, within } from '@testing-library/react';

import i18next from '@polkadot/react-components/i18n';
import { MemoryStore } from '@polkadot/test-support/keyring';
import { keyring } from '@polkadot/ui-keyring';
import { BN_ZERO, formatBalance } from '@polkadot/util';

import { someBalances, someStakingAccount } from '../../test/hooks/default';
import { AccountsPage } from '../../test/pages/accountsPage';

describe('Accounts page', () => {
  let accountsPage: AccountsPage;

  beforeAll(async () => {
    await i18next.changeLanguage('en');
    keyring.loadAll({ isDevelopment: true, store: new MemoryStore() });
  });

  beforeEach(() => {
    accountsPage = new AccountsPage();
  });

  describe('when no accounts', () => {
    it('shows a table', async () => {
      accountsPage.renderPage([]);

      const accountsTable = await accountsPage.findAccountsTable();

      expect(accountsTable).not.toBeNull();
    });

    it('the accounts table contains no account rows', async () => {
      accountsPage.renderPage([]);

      const accountRows = await accountsPage.findAccountRows();

      expect(accountRows).toHaveLength(0);
    });

    it('the accounts table contains a message about no accounts available', async () => {
      accountsPage.renderPage([]);

      const accountsTable = await accountsPage.findAccountsTable();
      const noAccountsMessage = await within(accountsTable).findByText(
        'You don\'t have any accounts. Some features are currently hidden and will only become available once you have accounts.');

      expect(noAccountsMessage).not.toBeNull();
    });

    it('no summary displays', () => {
      accountsPage.renderPage([]);
      const summaries = screen.queryAllByTestId(/card-summary:total \w+/i);

      expect(summaries).toHaveLength(0);
    });
  });

  describe('when some accounts exist', () => {
    it('the accounts table contains some account rows', async () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);

      const accountRows = await accountsPage.findAccountRows();

      expect(accountRows).toHaveLength(2);
    });

    it('some summary displays', () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);

      const summaries = screen.queryAllByTestId(/card-summary:total \w+/i);

      expect(summaries).not.toHaveLength(0);
    });

    function showBalance (amount: string | number | BN) {
      // Formats exactly as <FormatBalance /> component does it
      return formatBalance(amount, { decimals: 12, forceUnit: '-', withUnit: false });
    }

    it('an account row displays the total balance info', async () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);
      const rows = await accountsPage.findAccountRows();

      const balance = await within(rows[0]).findByTestId('balance-summary');

      const expectedAmount = '1050000000000'; // = Free + Reserved from mocked APIs
      const expectedText = showBalance(expectedAmount);

      expect(balance).toHaveTextContent(expectedText);

      // check that we don't compare 0.0000 vs 0.0000 because of rounding
      expect(expectedText).not.toBe(showBalance(0));
    });

    it('summary displays balance', async () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);

      // Two accounts have Free + Reserved balance
      const expectedAmount = someBalances.freeBalance.add(someBalances.reservedBalance).muln(2);
      const expectedText = showBalance(expectedAmount);

      const summary = await screen.findByTestId(/card-summary:(total )?balance/i);

      expect(summary).toHaveTextContent(expectedText);
    });

    it('summary displays transferrable', async () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);

      const expectedAmount = someBalances.availableBalance.muln(2);
      const expectedText = showBalance(expectedAmount);

      const summary = await screen.findByTestId(/card-summary:(total )?transferrable/i);

      expect(summary).toHaveTextContent(expectedText);
    });

    it('summary displays locked', async () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);

      const expectedAmount = someBalances.lockedBalance.muln(2);
      const expectedText = showBalance(expectedAmount);

      const summary = await screen.findByTestId(/card-summary:(total )?locked/i);

      expect(summary).toHaveTextContent(expectedText);
    });

    it('summary displays bonded', async () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);

      const expectedAmount = someStakingAccount.stakingLedger.active.unwrap().muln(2);
      const expectedText = showBalance(expectedAmount);

      const summary = await screen.findByTestId(/card-summary:(total )?bonded/i);

      expect(summary).toHaveTextContent(expectedText);
    });

    it('summary displays unbonding', async () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);

      // Unbonding amount is the sum of "unlocking" for each account
      const expectedAmount = someStakingAccount
        .unlocking?.reduce((acc, { value }) => acc.add(value), BN_ZERO)
        .muln(2) ?? BN_ZERO;
      const expectedText = showBalance(expectedAmount);

      const summary = await screen.findByTestId(/card-summary:(total )?unbonding/i);

      expect(summary).toHaveTextContent(expectedText);
    });

    it('summary displays redeemable', async () => {
      accountsPage.renderPage([
        { id: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', totalBalance: 10000 },
        { id: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', totalBalance: 999 }
      ]);

      // Unbonding amount is the sum of "unlocking" for each account
      const expectedAmount = someStakingAccount.redeemable?.muln(2) ?? BN_ZERO;
      const expectedText = showBalance(expectedAmount);

      const summary = await screen.findByTestId(/card-summary:(total )?redeemable/i);

      expect(summary).toHaveTextContent(expectedText);
    });
  });
});
