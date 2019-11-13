import React, { Fragment } from 'react';
import { Global, css } from '@emotion/core';

import { IStylesProps } from 'common/components/Styles/types';

import * as Roobert from 'common/assets/fonts/Roobert';
import * as LabGrotesque from 'common/assets/fonts/LabGrotesque';

const reset = css`
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

  @font-face {
    font-family: 'Roobert';
    font-weight: normal;
    src: url(${Roobert.Normal}) format('opentype');
  }

  @font-face {
    font-family: 'Roobert';
    font-weight: 600;
    src: url(${Roobert.SemiBold}) format('opentype');
  }

  @font-face {
    font-family: 'Lab Grotesque';
    font-weight: normal;
    src: url(${LabGrotesque.Normal}) format('opentype');
  }

  @font-face {
    font-family: 'Lab Grotesque';
    font-weight: bold;
    src: url(${LabGrotesque.Normal}) format('opentype');
  }
`;

const system = css`
  :root {
    /* Colors */
    --color-background: #f4f5f6;
    --color-background-control: #e1e5e6;
    --color-heading: #878b8d;
    --color-default: #ffffff;
    --color-border: rgba(0, 0, 0, 0.15);
    --color-view: #2b7cee;
    --color-action: #ffc800;
    --color-darkness: #7f8487;
    --color-primary: #98989d;
    --color-active: #000000;
    --color-negative: #e91630;
    --color-positive: #34c86e;

    /* Font Faces */
    --font-family-heading: 'Roobert';
    --font-family-paragraph: 'Lab Grotesque';

    /* Typography */
    --heading-size-large: 32px/24px var(--font-family-heading);
    --heading-size-medium: 24px/24px var(--font-family-heading);
    --heading-size-small: 18px/24px var(--font-family-heading);

    --paragraph-size-medium: 14px/24px var(--font-family-paragraph);
    --paragraph-size-small: 11px/13px var(--font-family-paragraph);

    /* Spaces */
    --space-size-ultra-small: 8px;
    --space-size-extra-small: 12px;
    --space-size-small: 16px;
    --space-size-medium: 24px;
    --space-size-large: 32px;
    --space-size-extra-large: 48px;

    /* Z Indexes */
    --z-index-list-header: 2;
  }
`;

const styles = css`
  ${reset}
  ${system}
`;

export const Styles = ({ children }: IStylesProps) => (
  <Fragment>
    <Global styles={styles} />
    {children}
  </Fragment>
);
