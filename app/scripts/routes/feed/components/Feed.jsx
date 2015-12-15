/**
 * Created by mobinni on 08/12/15.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

class Feed extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <ul>
                    <Link to={'/feed/1'}>Item 1</Link>
                    <Link to={'/feed/2'}>Item 2</Link>
                    <Link to={'/feed/3'}>Item 3</Link>
                </ul>
            </div>
        )
    }
}

export default Feed;