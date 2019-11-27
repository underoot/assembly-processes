import React from 'react';
import { storiesOf } from '@storybook/react';

import { Card } from 'processes/components/Card';
import {
  IProcess,
  AssemblyStatus,
  ReviewStatus
} from 'processes/types/Process';

const process: IProcess = {
  id: '5d4193af0717dd5261aac038',
  img: 'http://placehold.it/160x100',
  age: 28,
  assemblyStatus: AssemblyStatus.IN,
  reviewStatus: ReviewStatus.DRAFT,
  title: '14: FREAKIN v6',
  updated: '2018-12-08T02:25:07 -03:00'
};

storiesOf('Card', module).add('General', () => (
  <Card process={process} onDelete={() => {}} onChangeTitle={() => {}} />
));
