import React from 'react';
import { Global, css } from '@emotion/core';

import { reset } from 'common/components/Styles/reset';
import { fonts } from 'common/components/Styles/fonts';

const system = css`
  :root {
    /* ## Цвета */
    --color-default: #ffffff;
    --color-background: #f4f5f6;
    --color-background-control: #e1e5e6;
    --color-heading: #878b8d;
    --color-border: rgba(0, 0, 0, 0.15);
    --color-focus: #2b7cee;
    --color-action: #ffc800;
    --color-darkness: #7f8487;
    --color-primary: #98989d;
    --color-active: #000000;
    --color-negative: #e91630;
    --color-positive: #34c86e;

    /* ## Шрифты */
    --font-family-heading: 'Roobert';
    --font-family-paragraph: 'Lab Grotesque';

    /* ## Типография */
    --heading-size-large: 32px/24px var(--font-family-heading);
    --heading-size-medium: 24px/24px var(--font-family-heading);
    --heading-size-small: 18px/24px var(--font-family-heading);

    --paragraph-size-medium: 14px/24px var(--font-family-paragraph);
    --paragraph-size-small: 11px/13px var(--font-family-paragraph);

    /* ## Пространство */
    --space-size-ultra-small: 8px;
    --space-size-extra-small: 12px;
    --space-size-small: 16px;
    --space-size-medium: 24px;
    --space-size-large: 32px;
    --space-size-extra-large: 48px;

    /* ## Z-Индексы */
    --z-index-list-header: 2;
  }
`;

const styles = css`
  ${reset}
  ${fonts}
  ${system}
`;

export const Styles = () => <Global styles={styles} />;
