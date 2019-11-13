import React from 'react';
import styled from '@emotion/styled';

import { useIntersection } from 'common/hooks/intersection';

import { IListProps } from 'processes/components/List/types';
import { Card } from 'processes/components/Card';

const StyledList = styled.main`
  display: flex;
  margin-top: var(--space-size-medium);
  flex-direction: column;
  grid-column: 4 / 13;
`;

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: var(--z-index-list-header);
  padding: var(--space-size-extra-small);
  margin-bottom: var(--space-size-small);
  background-color: rgba(255, 255, 255, 0.8);
`;

const StyledListWrapper = styled.div`
  padding-bottom: var(--space-size-large);
`;

export const ProcessesList = ({
  header,
  processes = [],
  onDelete,
  onScrollToEnd,
  onChangeTitle
}: IListProps) => {
  const marker = useIntersection(onScrollToEnd);

  return (
    <StyledList>
      <StyledHeader>{header}</StyledHeader>
      <StyledListWrapper>
        {processes.map(process => (
          <Card
            key={process.id}
            process={process}
            onDelete={onDelete}
            onChangeTitle={onChangeTitle}
          />
        ))}
        {marker}
      </StyledListWrapper>
    </StyledList>
  );
};
