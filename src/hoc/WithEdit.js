import React from 'react';

import InputBar from '../components/InputBar';
import AppConstatns from '../constants/common';

/**
 * HOC with Edit feature having UI input field and button.
 *
 * @param {Object<React.Component>} Component
 */
const withEdit = (Component) => {

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
     * @param {Object} todoText Text entered in input field.
     */
    handleChange = (todoText) => {
      this.setState({
        todoText
      });
    }

    /**
     * Submission handler for add.
     *
     * @memberof InputBar
     */
    handleSubmit = () => {
      const { todoText } = this.state;

      // if input text is blank do not add
      if (!todoText) {
        return;
      }

      const { submit } = this.props;

      submit(todoText);

      this.setState({
        todoText: ''
      });
    }

    /**
     * This functon autmatically calls after component is rendered.
     *
     */
    componentDidMount() {
      const { editionObject: {
        title = ''
      } } = this.props;

      this.setState({
        todoText: title
      });
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
          btnText={AppConstatns.SAVE_TXT}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };
};

export default withEdit(InputBar);
