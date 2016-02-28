import {RoutingContext} from 'react-router';
import ejs from 'ejs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';

const _renderComponents = (props, store) => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RoutingContext {...props} />
    </Provider>
  );
};

export default (renderProps, indexHtml, store) => {
  return new Promise((resolve, reject) => {
    let output = _renderComponents(renderProps, store);
    resolve(
      ejs.render(indexHtml, {
        reactOutput: output,
        store: JSON.stringify(store)
      })
    );
  });
};

