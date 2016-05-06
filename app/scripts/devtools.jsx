// General imports
import React from 'react';
import ReactDOM from 'react-dom';
import SliderMonitor from 'redux-slider-monitor';
import DevTools from '../lib/utils/devtools';

if (process.env.feature.DEV) {
  const store = window.__STORE__;
  //  ReactDOM.render(<DevTools store={store}/>, document.getElementById('devtools'));
}


