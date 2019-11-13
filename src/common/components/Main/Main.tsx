import styled from '@emotion/styled';

export const Main = styled.div`
  padding: 0 80px var(--space-size-large);
  margin-top: var(--space-size-medium);
  display: grid;
  grid-template-columns: repeat(3, 80px) 1fr;
  grid-column-gap: var(--space-size-large);
  overflow: auto;
`;
