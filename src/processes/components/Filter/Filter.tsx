import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';

import { AssemblyStatus, ReviewStatus } from 'processes/types/Process';
import {
  AssemblyStatusHumanRedableText,
  ReviewStatusHumanReadableText
} from 'processes/texts';
import {
  IFilterProps,
  IFilterItemProps,
  IFilterPaneProps
} from 'processes/components/Filter/types';

const StyledPane = styled.div<IFilterPaneProps>`
  position: sticky;
  grid-column: 1 / 4;

  align-self: flex-start;
  top: 0px;

  max-width: 240px;

  background-color: var(--color-background);
  padding: var(--space-size-medium) var(--space-size-medium)
    var(--space-size-large);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  box-sizing: border-box;

  transition: height 0.5s;

  ${({ hide }) => hide && 'height: 72px; overflow: hidden;'}

  @media (max-width: 1024px) {
    grid-row: 1;
    grid-column: 1;
    width: 100%;
    max-width: unset;
  }
`;

const StyledTitle = styled.h2`
  cursor: pointer;
  font: var(--heading-size-small);
  font-weight: 600;
  margin-bottom: var(--space-size-medium);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSubTitle = styled.h3`
  font: var(--paragraph-size-small);
  color: var(--color-primary);
  margin-bottom: var(--space-size-extra-small);
`;

const StyledFilterList = styled.ul`
  margin-bottom: var(--space-size-small);
`;

const getFilterItemActiveStyle = (props: IFilterItemProps) => {
  if (!props.active) {
    return '';
  }

  return `
        border-left: 1px solid;
        color: var(--color-active);
    `;
};

const StyledFilterItem = styled.li<IFilterItemProps>`
  ${getFilterItemActiveStyle}

  transition: color 0.2s;

  &:hover {
    color: var(--color-active);
  }

  padding-left: var(--space-size-small);
`;

const StyledFilterItemWrapper = styled.div`
  cursor: pointer;

  font: var(--paragraph-size-medium);
  color: rgba(0, 0, 0, 0.5);

  & + & {
    margin-top: var(--space-size-ultra-small);
  }
`;

export const Filter = ({
  assemblyStatus = AssemblyStatus.ANY,
  reviewStatus = ReviewStatus.ANY,
  onChangeAssemblyStatus,
  onChangeReviewStatus
}: IFilterProps) => {
  const [hidden, changeHidden] = useState(false);

  const toggleHidden = useCallback(() => changeHidden(hidden => !hidden), []);

  return (
    <StyledPane hide={hidden}>
      <StyledTitle onClick={toggleHidden}>Filter</StyledTitle>

      <StyledSubTitle>Assembly</StyledSubTitle>
      <StyledFilterList>
        {Object.entries(AssemblyStatus).map(([key, status]) => (
          <StyledFilterItemWrapper
            key={key}
            onClick={() => onChangeAssemblyStatus(status)}
          >
            <StyledFilterItem active={assemblyStatus === status}>
              {AssemblyStatusHumanRedableText[status]}
            </StyledFilterItem>
          </StyledFilterItemWrapper>
        ))}
      </StyledFilterList>

      <StyledSubTitle>Review</StyledSubTitle>
      <StyledFilterList>
        {Object.entries(ReviewStatus).map(([key, status]) => (
          <StyledFilterItemWrapper
            key={key}
            onClick={() => onChangeReviewStatus(status)}
          >
            <StyledFilterItem active={reviewStatus === status}>
              {ReviewStatusHumanReadableText[status]}
            </StyledFilterItem>
          </StyledFilterItemWrapper>
        ))}
      </StyledFilterList>
    </StyledPane>
  );
};
