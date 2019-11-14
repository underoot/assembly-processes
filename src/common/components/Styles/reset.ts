import { css } from '@emotion/core';

export const reset = css`
  #root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  body {
    margin: 0;
  }

  h1,
  h2,
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }

  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }
`;
