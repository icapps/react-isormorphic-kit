import React, {Component} from 'react';
import {Link} from 'react-router';

class Main extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to="/feed/" query={{}}>Feed</Link>
                </ul>
                You just rendered this
                {this.props.children}
            </div>
        )
    }
}
export default Main;