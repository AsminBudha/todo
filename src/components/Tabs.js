import React from 'react';
import { REMAINING, COMPLETED } from '../constants/Utils';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

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
    const tab = this.props.tab;
    // console.log(tab);
    return (
      <div className='row tabs'>
        <button className={'col-sm btnWithoutStyle ' + (tab === -1 && 'active')} value='home' onClick={this.handleClick}>Home</button>
        <button className={'col-sm btnWithoutStyle ' + (tab === COMPLETED && 'active')} value='completed' onClick={this.handleClick}>Completed</button>
        <button className={'col-sm btnWithoutStyle ' + (tab === REMAINING && 'active')} value='remaining' onClick={this.handleClick}>Remaining</button>
      </div>
    );
  }
}

export default Tabs;