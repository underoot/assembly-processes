import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IListProps } from 'processes/components/List/types';
import {
  SCROLL_DEBOUNCE_TIME,
  SCROLL_MARGIN
} from 'processes/components/List/constants';
import { Card } from 'processes/components/Card';

const StyledListContent = styled.div`
  overflow: hidden;
  grid-column: 4 / 13;

  @media (max-width: 1024px) {
    grid-row: 2;
    grid-column: 1;
  }
`;

const StyledList = styled.main`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  margin-top: var(--space-size-medium);
  flex-direction: column;
  padding: 10px;
  padding-top: 0px;
  margin-right: -50px;
  padding-right: 50px;
  overflow-y: scroll;
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
  onChangeTitle,
  onIncrementPage
}: IListProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const onScroll = (e: Event) => {
      if (!e.target) {
        return;
      }

      const curr = e.target as HTMLElement;

      if (curr.scrollHeight <= curr.clientHeight) {
        return;
      }

      if (curr.scrollTop + SCROLL_MARGIN >= curr.clientHeight) {
        onIncrementPage();
      }
    };

    const subscription = fromEvent(ref.current, 'scroll')
      .pipe(debounceTime(SCROLL_DEBOUNCE_TIME))
      .subscribe(onScroll);

    return () => {
      subscription.unsubscribe();
    };
  }, [ref, onIncrementPage]);

  return (
    <StyledListContent>
      <StyledList ref={ref}>
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
        </StyledListWrapper>
      </StyledList>
    </StyledListContent>
  );
};
