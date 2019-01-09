import React from 'react';
import { REMAINING, COMPLETED } from '../constants/Utils';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: -1
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const val = event.target.value;
    let tab = -1;

    if (val === 'completed') {
      tab = COMPLETED;
    }
    else if (val === 'remaining') {
      tab = REMAINING;
    }
    this.props.changeTab(tab);
  }

  render() {

    return (
      <div>
        <button value='home' onClick={this.handleClick}>Home</button>
        <button value='completed' onClick={this.handleClick}>Completed</button>
        <button value='remaining' onClick={this.handleClick}>Remaining</button>
      </div>
    );
  }
}

export default Tabs;