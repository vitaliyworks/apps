// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountBalance } from '../types';

import React from 'react';
import styled from 'styled-components';

import { useTranslation } from '@polkadot/app-treasury/translate';
import { CardSummary, Label, SummaryBox } from '@polkadot/react-components';
import { FormatBalance } from '@polkadot/react-query';

interface Props {
  className?: string;
  balance?: AccountBalance;
}

const MamaCard = React.memo(styled(CardSummary)`
  .--ChildCard-left {
    float: left;
    background: transparent !important;
    text-align: right;

    margin-left: -3rem;
    margin-top: -1px;

    .ui--Labelled {
      > label {
        margin-bottom: 4px;
      }
    }
  }

  .--ChildCard-right {
    float: right;

    .key {
      text-align: left;
    }

    .value {
      font-weight: 100;
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
      {balance?.locked.gtn(0) &&
        <MamaCard label={null} >

          <article className='--ChildCard-left'>
            <CardSummary label={t<string>('total locked')}>
              <FormatBalance value={balance?.locked} />
            </CardSummary>
          </article>

          <div className='--ChildCard-right'>

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
