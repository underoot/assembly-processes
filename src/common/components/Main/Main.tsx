import styled from '@emotion/styled';

export const Main = styled.div`
  padding: 0 80px;
  margin-top: var(--space-size-medium);
  display: grid;
  grid-template-columns: repeat(3, 80px) 1fr;
  grid-column-gap: var(--space-size-large);
  overflow: hidden;

  @media (max-width: 414px) {
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;
