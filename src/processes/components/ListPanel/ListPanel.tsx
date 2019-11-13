import React from 'react';
import styled from '@emotion/styled';

import { Switch } from 'common/components/Switch';
import { Input } from 'common/components/Input';

import { IListPanelProps } from 'processes/components/ListPanel/types';
import { SortOrder } from 'common/types';
import { Icon } from 'common/components/Icon';

const StyledPanel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled.h2`
  font: var(--heading-size-medium);
  font-weight: 600;
`;

const StyledTicker = styled.span`
  font: var(--paragraph-size-small);
  font-weight: bold;
  color: var(--color-default);
  vertical-align: middle;
  padding: 5px;
  margin-left: var(--space-size-extra-small);
  border-radius: 14px;
  background-color: var(--color-darkness);
`;

const StyledControls = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSwitch = styled.div`
  margin-right: var(--space-size-small);
`;

const StyledInput = styled.div`
  width: 300px;
`;

const StyledLabel = styled.span`
  font: var(--paragraph-size-medium);
  color: var(--color-primary);
  margin-right: var(--space-size-small);
`;

export const ListPanel = ({
  count,
  order,
  onChangeOrder,
  search,
  onChangeSearch,
  onClearSearch
}: IListPanelProps) => (
  <StyledPanel>
    <StyledTitle>
      Assembly Process
      {Boolean(count) && <StyledTicker>{count}</StyledTicker>}
    </StyledTitle>
    <StyledControls>
      <StyledLabel>Show</StyledLabel>
      <StyledSwitch>
        <Switch value={order} onChange={onChangeOrder}>
          <Switch.Item value={SortOrder.ASC}>Latest first</Switch.Item>
          <Switch.Item value={SortOrder.DESC}>Old first</Switch.Item>
        </Switch>
      </StyledSwitch>
      <StyledInput>
        <Input
          onChange={e => onChangeSearch(e.currentTarget.value)}
          onClear={onClearSearch}
          icon={<Icon type="search" />}
          placeholder="Search by assembly name"
          value={search}
        />
      </StyledInput>
    </StyledControls>
  </StyledPanel>
);
