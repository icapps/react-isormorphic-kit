import React, {Component} from 'react';
import {Link} from 'react-router';

class Main extends Component {
  render() {
    return (
      <div>
        <Link to={'/feed'}>Feed</Link>
        {this.props.children || 'Home'}
      </div>

    )
  }
}

export default Main;
