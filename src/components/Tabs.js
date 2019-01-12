import React from 'react';

import { REMAINING, COMPLETED, HOME } from '../utils/utils';

class Tabs extends React.Component {
  /**
   * Handles tab change in menus
   *
   * @param {Object} event event triggered on click on tabs
   */
  handleClick = (event) => {
    let tab = HOME;
    const { value } = event.target;

    if (value === COMPLETED_TXT) {
      tab = COMPLETED;
    }
    else if (value === REMAINING_TXT) {
      tab = REMAINING;
    }

    this.props.changeTab(tab);
  }

  render() {
    const { tab } = this.props;

    let homeClass = 'col-sm btnWithoutStyle ';
    let completedClass = 'col-sm btnWithoutStyle ';
    let remainingClass = 'col-sm btnWithoutStyle ';
    if (tab === HOME) {
      homeClass += 'active';
    }
    else if (tab === COMPLETED) {
      completedClass += 'active';
    }
    else if (tab === REMAINING) {
      remainingClass += 'active';
    }

    return (
      <div className='row tabs'>
        <button
          value={HOME_TXT}
          onClick={this.handleClick}
          className={homeClass}
        >
          {HOME_TXT}
        </button>
        <button
          value={COMPLETED_TXT}
          onClick={this.handleClick}
          className={completedClass}
        >
          {COMPLETED_TXT}
        </button>
        <button
          value={REMAINING_TXT}
          onClick={this.handleClick}
          className={remainingClass}
        >
          {REMAINING_TXT}
        </button>
      </div>
    );
  }
}

export default Tabs;
export const HOME_TXT = 'Home'
export const COMPLETED_TXT = 'Completed';
export const REMAINING_TXT = 'Remaining';
