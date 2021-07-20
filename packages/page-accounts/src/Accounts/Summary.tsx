// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountBalance } from '../types';

import React from 'react';

import { FormatBalance } from '@polkadot/react-query';
import { CardSummary, SummaryBox, LabelHelp } from '@polkadot/react-components';
import { useTranslation } from '@polkadot/app-treasury/translate';

interface Props {
  className?: string;
  balance?: AccountBalance;
}

interface TitleProps {
  className?: string;
  text: string;
  help: string;
}

function Title({ className, text, help }: TitleProps) {
  return (
    <div className={className}>
      {text}
      <LabelHelp className={className} help={help}/>
    </div>
  );
}

function Summary({ className, balance }: Props) {
  const { t } = useTranslation();

  return (
    <SummaryBox className={className}>
      <section>
        <CardSummary label={<Title text={t('total balance')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.total}/>
        </CardSummary>
        <CardSummary label={<Title text={t('total transferrable')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.transferrable}/>
        </CardSummary>
        <CardSummary label={<Title text={t('total locked')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.locked}/>
        </CardSummary>
        <CardSummary label={<Title text={t('bonded')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.bonded}/>
        </CardSummary>
        <CardSummary label={<Title text={t('redeemable')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.redeemable}/>
        </CardSummary>
        <CardSummary label={<Title text={t('unbonding')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.unbonding}/>
        </CardSummary>
      </section>
    </SummaryBox>
  )
}

export default React.memo(Summary)
