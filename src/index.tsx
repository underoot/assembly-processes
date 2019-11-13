/** Global pollyfills */
import 'whatwg-fetch';
import 'url-search-params-polyfill';
import 'intersection-observer';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
