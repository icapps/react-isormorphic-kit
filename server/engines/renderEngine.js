import {RoutingContext} from 'react-router';
import ejs from 'ejs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const _renderComponents = (props) => {
    return ReactDOMServer.renderToString(
        <RoutingContext {...props} />
    );
};

export default (renderProps, indexHtml) => {
    return new Promise((resolve, reject) => {
        let output = _renderComponents(renderProps);
        resolve(
            ejs.render(indexHtml, {
                reactOutput: output
            })
        );
    });
};

