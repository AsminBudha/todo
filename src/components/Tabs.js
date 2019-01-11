import React from 'react';

import { REMAINING, COMPLETED } from '../constants/Utils';

class Tabs extends React.Component {
  /**
   * handles tab change in menus
   * @param {Object} event event triggered on click on tabs
   * @returns {undefined}
   */
  handleClick = (event) => {
    let tab = -1;
    const val = event.target.value;

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

    return (
      <div className='row tabs'>
        <button
          value='home'
          onClick={this.handleClick}
          className={'col-sm btnWithoutStyle ' + (tab === -1 && 'active')}
        >
          Home
        </button>
        <button
          value='completed'
          onClick={this.handleClick}
          className={'col-sm btnWithoutStyle ' + (tab === COMPLETED && 'active')}
        >
          Completed
        </button>
        <button
          value='remaining'
          onClick={this.handleClick}
          className={'col-sm btnWithoutStyle ' + (tab === REMAINING && 'active')}
        >
          Remaining
        </button>
      </div>
    );
  }
}

export default Tabs;