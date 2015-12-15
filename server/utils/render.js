import {RoutingContext} from 'react-router';
import ejs from 'ejs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const _renderOutput = (props) => {
    return ReactDOMServer.renderToString(
        <RoutingContext {...props} />
    );
};

export default (renderProps, indexHtml) => {
    return new Promise((resolve, reject) => {
        resolve(
            ejs.render(indexHtml, {
                reactOutput: _renderOutput(renderProps),
                initialState: JSON.stringify({})
            })
        );
    });
};

