import React from 'react';
import InputBar from '../components/InputBar';

/**
 * HOC with Add feature having UI input field and button.
 *
 * @param {Object<React.Component>} Component
 */
const withAdd = (Component) => {

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
     * This function is automatically called to render JSX of compoenent.
     *
     * @returns
     */
    render() {
      const { todoText } = this.state;

      return (
        <Component {...this.props} todoText={todoText} handleChange={this.handleChange} handleSubmit={this.handleSubmit} btnText='Add' />
      );
    }
  };
};

export default withAdd(InputBar);
