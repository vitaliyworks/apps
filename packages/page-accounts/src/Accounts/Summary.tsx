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

interface LabelProps {
  className?: string;
  text: string;
  help: string;
}

function Label({ className, text, help }: LabelProps) {
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
        <CardSummary label={<Label text={t('total balance')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.total}/>
        </CardSummary>
        <CardSummary label={<Label text={t('total transferrable')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.transferrable}/>
        </CardSummary>
        <CardSummary label={<Label text={t('total locked')} help={'FIXME: add help'}/>}>
          <FormatBalance value={balance?.locked}/>
        </CardSummary>
      </section>
    </SummaryBox>
  )
}

export default React.memo(Summary)
