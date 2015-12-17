import {RoutingContext} from 'react-router';
import ejs from 'ejs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const _renderComponents = (props) => {
    return ReactDOMServer.renderToString(
        <RoutingContext {...props} />
    );
};

export default (shouldRender, renderProps, indexHtml) => {
    return new Promise((resolve, reject) => {
        let output = shouldRender ? _renderComponents(renderProps) : '';
        resolve(
            ejs.render(indexHtml, {
                reactOutput: output
            })
        );
    });
};

