import { css } from '@emotion/core';

import * as Roobert from 'common/assets/fonts/Roobert';
import * as LabGrotesque from 'common/assets/fonts/LabGrotesque';

export const fonts = css`
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
