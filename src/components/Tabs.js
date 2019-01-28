import React from 'react';
import PropTypes from 'prop-types';

import Common from '../constants/common';

/**
 * Component which shows three tabs with equal width.
 *
 * @class Tabs
 * @extends {React.Component}
 */
class Tabs extends React.Component {
  /**
   * Handles tab change in menus.
   *
   * @param {Object} event Event triggered on click on tabs.
   */
  handleClick = (event) => {
    let tab = Common.HOME;
    const { value } = event.target;

    if (value === Common.COMPLETED_TXT) {
      tab = Common.COMPLETED;
    } else if (value === Common.REMAINING_TXT) {
      tab = Common.REMAINING;
    }

    this.props.changeTab(tab);
  }

  /**
   * Render function is automaticall called which renders JSX component.
   *
   * @returns
   * @memberof Tabs
   */
  render() {
    const { tab } = this.props;

    let homeClass = 'col-sm btnWithoutStyle ';
    let completedClass = 'col-sm btnWithoutStyle ';
    let remainingClass = 'col-sm btnWithoutStyle ';

    if (tab === Common.HOME) {
      homeClass += 'active';
    } else if (tab === Common.COMPLETED) {
      completedClass += 'active';
    } else if (tab === Common.REMAINING) {
      remainingClass += 'active';
    }

    return (
      <div className='row tabs'>
        <button
          value={Common.HOME_TXT}
          onClick={this.handleClick}
          className={homeClass}
        >
          {Common.HOME_TXT}
        </button>
        <button
          value={Common.COMPLETED_TXT}
          onClick={this.handleClick}
          className={completedClass}
        >
          {Common.COMPLETED_TXT}
        </button>
        <button
          value={Common.REMAINING_TXT}
          onClick={this.handleClick}
          className={remainingClass}
        >
          {Common.REMAINING_TXT}
        </button>
      </div>
    );
  }
}

Tabs.propTypes = {
  tab: PropTypes.number.isRequired,
  changeTab: PropTypes.func.isRequired,
};

export default Tabs;
