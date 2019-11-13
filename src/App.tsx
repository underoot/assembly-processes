import React, { Fragment } from 'react';

import { Styles } from 'common/components/Styles';
import { Header } from 'common/components/Header';
import { Page } from 'processes/components/Page';
import { Main } from 'common/components/Main/Main';

function App() {
  return (
    <Fragment>
      <Styles />
      <Header title="Design2Robofacturing" />
      <Main>
        <Page />
      </Main>
    </Fragment>
  );
}

export default App;
