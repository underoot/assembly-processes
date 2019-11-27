import React, { Fragment } from 'react';
import { addDecorator, configure } from '@storybook/react';

import { Styles } from 'common/components/Styles';

configure(require.context('../src', true, /\.stories.tsx?$/), module);
addDecorator(storyFn => <Fragment><Styles />{storyFn()}</Fragment>);