import React from 'react';
import styled from '@emotion/styled';

import { Switch } from 'common/components/Switch';
import { Input } from 'common/components/Input';
import { SortOrder } from 'common/types';
import { Icon } from 'common/components/Icon';

import { IListPanelProps } from 'processes/components/ListPanel/types';

const StyledPanel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled.h2`
  font: var(--heading-size-medium);
  font-weight: 600;
  margin-right: var(--space-size-small);

  @media (max-width: 414px) {
    display: none;
  }
`;

const StyledTitleText = styled.span`
  @media (max-width: 1366px) {
    display: none;
  }
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

  @media (max-width: 414px) {
    display: none;
  }
`;

const StyledControls = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 414px) {
    flex-direction: column;
    width: 100%;
  }
`;

const StyledSwitch = styled.div`
  min-width: 235px;
  margin-right: var(--space-size-small);
`;

const StyledInput = styled.div`
  @media (min-width: 1440px) {
    width: 300px;
  }

  @media (max-width: 414px) {
    width: 100%;
    order: -1;
    margin-bottom: var(--space-size-small);
  }
`;

const StyledLabel = styled.span`
  font: var(--paragraph-size-medium);
  color: var(--color-primary);
  margin-right: var(--space-size-small);

  @media (max-width: 1440px) {
    display: none;
  }
`;

export const ListPanel = ({
  count,
  order,
  onChangeOrder,
  search,
  onChangeSearch,
  onClearSearch
}: IListPanelProps) => {
  return (
    <StyledPanel>
      <StyledTitle>
        <StyledTitleText>Assembly Process</StyledTitleText>
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
            onClear={onClearSearch}
            onChange={e => onChangeSearch(e.target.value)}
            icon={<Icon type="search" />}
            placeholder="Search by assembly name"
            value={search}
          />
        </StyledInput>
      </StyledControls>
    </StyledPanel>
  );
};
