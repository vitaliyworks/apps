// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { ActionStatus } from '@polkadot/react-components/Status/types';
import type { AccountId, ProxyDefinition, ProxyType, Voting } from '@polkadot/types/interfaces';
import type { Delegation, SortedAccount } from '../types';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { Button, Input, Table } from '@polkadot/react-components';
import { useAccounts, useApi, useCall, useFavorites, useIpfs, useLedger, useLoadingDelay, useToggle } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { BN_ZERO } from '@polkadot/util';

import CreateModal from '../modals/Create';
import ImportModal from '../modals/Import';
import Ledger from '../modals/Ledger';
import Multisig from '../modals/MultisigCreate';
import Proxy from '../modals/ProxiedAdd';
import Qr from '../modals/Qr';
import { useTranslation } from '../translate';
import { sortAccounts } from '../util';
import Account from './Account';
import BannerClaims from './BannerClaims';
import BannerExtension from './BannerExtension';

const Summary = ({ className, balanceTotal, transferableTotal, lockedTotal, style }: any) => {
  const showBalance = (amount: BN) => <FormatBalance value={amount} />;

  return (
    <div className={className} style={style} >
      <div>
        TOTAL BALANCE: {showBalance(balanceTotal)}
      </div>

      <div>
        TRANSFERABBLE BALANCE: {showBalance(transferableTotal)}
      </div>

      <div>
        TOTAL LOCKED: {showBalance(lockedTotal)}
      </div>
    </div>
  )
}

export default React.memo(styled(Summary)`
    background-color: red;
    margin: 20px;
    margin-bottom: 30px;
`);
