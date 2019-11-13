import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled/macro';

import { Icon } from 'common/components/Icon';

import {
  ICardProps,
  ICardReviewStatusProps,
  ICardAssemblyStatusProps
} from 'processes/components/Card/types';
import {
  ReviewStatusHumanReadableText,
  AssemblyStatusHumanRedableText
} from 'processes/texts';
import { ReviewStatus, AssemblyStatus } from 'processes/types/Process';

const StyledButton = styled.button`
  cursor: pointer;
  display: none;
  position: absolute;
  right: var(--space-size-medium);
  bottom: var(--space-size-medium);
  border: none;
  border-radius: 4px;
  padding: var(--space-size-extra-small) var(--space-size-extra-large)
    var(--space-size-extra-small) var(--space-size-extra-small);
  font: var(--paragraph-size-medium);
  color: var(--color-default);
  background-color: var(--color-view);
`;

const StyledButtonIcon = styled.span`
  position: absolute;
  right: var(--space-size-extra-small);
`;

const StyledToolbox = styled.div`
  display: none;
  position: absolute;
  top: var(--space-size-medium);
  right: var(--space-size-medium);
`;

const StyledCard = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  padding: var(--space-size-small) var(--space-size-large);
  transition: box-shadow 0.2s;
  box-shadow: 0px 1px 4px rgba(54, 65, 76, 0.15);

  &:hover {
    box-shadow: 0px 6px 12px rgba(54, 65, 76, 0.15);
    ${StyledButton}, ${StyledToolbox} {
      display: inline-block;
    }
  }

  & + & {
    margin-top: var(--space-size-extra-small);
  }
`;

const StyledImage = styled.img`
  width: 160px;
  height: 100px;
  margin-right: 40px;
`;

const StyledDescription = styled.div``;
const StyledTitle = styled.h3`
  font: var(--heading-size-small);
  font-weight: bold;
`;

const StyledInfo = styled.div`
  font: var(--paragraph-size-medium);
  width: 300px;
`;

const StyledInfoLine = styled.div`
  display: flex;

  &::after {
    content: '';
    display: inline-block;
    border-bottom: 1px solid var(--color-primary);
    flex-grow: 1;
    order: 2;
    margin: 5px;
  }
`;

const StyledLabel = styled.span`
  order: 1;
  color: var(--color-primary);
`;

const getReviewStatusColor = ({ status }: ICardReviewStatusProps) => {
  if (status === ReviewStatus.SIMULATION_NEGATIVE) {
    return 'var(--color-negative)';
  }

  if (status === ReviewStatus.SIMULATION_POSITIVE) {
    return 'var(--color-positive)';
  }

  return 'var(--color-active)';
};

const StyledReviewStatus = styled.span<ICardReviewStatusProps>`
  order: 3;
  color: ${getReviewStatusColor};
`;

const StyledLastUpdated = styled.span`
  order: 3;
`;

const getBackgroundColorAssemblyStatus = ({
  status
}: ICardAssemblyStatusProps) =>
  status === AssemblyStatus.IN ? 'var(--color-action)' : 'var(--color-default)';

const StyledAssemblyStatus = styled.span<ICardAssemblyStatusProps>`
  position: absolute;
  top: var(--space-size-extra-small);
  left: var(--space-size-extra-small);
  padding: 4px 6px;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  font: var(--paragraph-size-small);
  font-weight: bold;
  background-color: ${getBackgroundColorAssemblyStatus};
`;

const StyledInput = styled.input`
  font: var(--heading-size-small);
  font-weight: bold;
`;

const StyledTitleWrapper = styled.div`
  margin-top: var(--space-size-extra-small);
  margin-bottom: 4px;
`;

export const Card = ({ process, onDelete, onChangeTitle }: ICardProps) => {
  const [editStarted, changeEditingStatus] = useState(false);
  const [newTitle, changeTitle] = useState(process.title);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeTitle(e.currentTarget.value);
  };

  const onBlur = () => {
    changeEditingStatus(false);
    onChangeTitle(process.id, newTitle);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      changeEditingStatus(false);
      onChangeTitle(process.id, newTitle);
    }
  };

  const title = editStarted ? (
    <StyledInput
      value={newTitle}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
    />
  ) : (
    <StyledTitle>{newTitle || process.title}</StyledTitle>
  );

  return (
    <StyledCard>
      <StyledAssemblyStatus status={process.assemblyStatus}>
        {AssemblyStatusHumanRedableText[process.assemblyStatus]}
      </StyledAssemblyStatus>
      <StyledImage src={process.img} />
      <StyledDescription>
        <StyledTitleWrapper>{title}</StyledTitleWrapper>
        <StyledInfo>
          <StyledInfoLine>
            <StyledLabel>Review:</StyledLabel>
            <StyledReviewStatus status={process.reviewStatus}>
              {ReviewStatusHumanReadableText[process.reviewStatus]}
            </StyledReviewStatus>
          </StyledInfoLine>
          <StyledInfoLine>
            <StyledLabel>Last Updates:</StyledLabel>
            <StyledLastUpdated>{process.updated}</StyledLastUpdated>
          </StyledInfoLine>
        </StyledInfo>
      </StyledDescription>
      <StyledToolbox>
        {!editStarted && (
          <Icon
            type="edit"
            onClick={() => changeEditingStatus(true)}
            tabIndex={0}
          />
        )}
        <Icon
          type="trash"
          onClick={() => {
            onDelete(process.id);
          }}
          tabIndex={0}
        />
      </StyledToolbox>
      <StyledButton>
        View Process
        <StyledButtonIcon>
          <Icon type="arrow" />
        </StyledButtonIcon>
      </StyledButton>
    </StyledCard>
  );
};
