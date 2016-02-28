/**
 * Created by mobinni on 08/12/15.
 */
import React, {Component} from 'react';
class Item extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {params} = this.props;
    return (
      <div>Item: {params.item}</div>
    )
  }
}

export default Item;