// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountBalance } from '../types';

import React from 'react';
import styled from 'styled-components';

import { useTranslation } from '@polkadot/app-treasury/translate';
import { CardSummary, Label, SummaryBox } from '@polkadot/react-components';
import { formatBalance } from '@polkadot/util';
import { FormatBalance } from '@polkadot/react-query';

interface Props {
  className?: string;
  balance?: AccountBalance;
}

const MamaCard = React.memo(styled(CardSummary)`

  .--BabyCard-left {
    float: left;
    background: transparent !important;
    text-align: right;
    border: none !important;
    margin-top: 2.5%;
    margin-left: -1.5rem;
  }

  .--BabyCard-right {
    float: right;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background: transparent !important;
    border: none !important;
    padding-bottom: 5px;

    .key {
      text-align: left;
    }

    .value {
      font-weight: 100;
      padding-top: 3px;
    }
  }

`);

function Summary ({ balance, className }: Props) {
  const { t } = useTranslation();

  return (
    <SummaryBox className={className}>

      <section>

      {balance?.total.gtn(0) &&
        <CardSummary label={t<string>('total balance')}>
          <FormatBalance value={balance?.total} />
        </CardSummary>}
      {balance?.transferrable.gtn(0) &&
        <CardSummary label={t<string>('total transferrable')}>
          <FormatBalance value={balance?.transferrable} />
        </CardSummary>}
      {true &&
        <MamaCard label={null} >

          <div className='--BabyCard-left'>
            <CardSummary label={t<string>('total locked')}>
              <FormatBalance value={balance?.locked} />
            </CardSummary>
          </div>

          <div className='--BabyCard-right'>
            <table>
              <tr>
                <th className='key'>
                  <Label label={t<string>('redeemable')} />
                </th>
                <th className='value'>
                  <FormatBalance value={balance?.redeemable} />
                </th>
              </tr>
              <tr>
                <th className='key'>
                  <Label label={t<string>('bonded')} />
                </th>
                <th className='value'>
                  <FormatBalance value={balance?.bonded} />
                </th>
              </tr>
              <tr>
                <th className='key'>
                  <Label label={t<string>('unbonding')} />
                </th>
                <th className='value'>
                  <FormatBalance value={balance?.unbonding} />
                </th>
              </tr>

            </table>
          </div>

        </MamaCard>
        }

    </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
