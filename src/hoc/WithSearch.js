import React from 'react';

import InputBar from '../components/InputBar';
import AppConstants from '../constants/common';

/**
 * HOC with Search feature having UI input field and button.
 *
 * @param {Object<React.Component>} Component
 */
const withSearch = (Component) => {

  return class extends React.Component {

    /**
     * Creates an instance of HOC withAdd Component.
     *
     * @param {*} props
     */
    constructor(props) {
      super(props);

      this.state = {
        todoText: ''
      };
    }

    /**
     * Handle the change in input field.
     *
     * @param {String} todoText Text entered in input field.
     */
    handleChange = (todoText) => {
      this.setState({
        todoText
      });
      this.handleSubmit(todoText);
    }

    /**
     * Submission handler for add.
     *
     * @param {String} todoText
     * @memberof InputBar
     */
    handleSubmit = (todoText) => {
      if (typeof (todoText) !== 'string') {
        todoText = this.state.todoText;
      }
      const { submit } = this.props;

      submit(todoText);
    }

    /**
     * This function is automatically called to render JSX of compoenent.
     *
     * @returns
     */
    render() {
      const { todoText } = this.state;

      return (
        <Component {...this.props}
          todoText={todoText}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          btnText={AppConstants.SEARCH_TXT}
        />
      );
    }
  };
};

export default withSearch(InputBar);
