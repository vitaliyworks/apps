// Copyright 2017-2021 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Balance } from '@polkadot/types/interfaces';

import { DeriveBalancesAll } from '@polkadot/api-derive/types';
import { useApi, useCall } from '@polkadot/react-hooks';

/**
 * Gets the account balance available
 *
 * @param accountId - TODO: what does 'null' mean? a default account id for some context?
 */
export function useBalance (accountId: string | null): Balance | undefined {
  const { api } = useApi();

  return useCall<DeriveBalancesAll>(api.derive.balances?.all, [accountId])?.availableBalance;
}

/**
 * Gets the account full balance information
 *
 * @param accountAddress The account address of which balance is to be returned
 * @returns full information about account's balances
 */
export function useBalancesAll (accountAddress: string): DeriveBalancesAll | undefined {
  const { api } = useApi();

  return useCall<DeriveBalancesAll>(api.derive.balances?.all, [accountAddress]);
}
