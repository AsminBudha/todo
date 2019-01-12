import React from 'react';

class InputBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todoText: ''
    }
  }

  /**
   * Checks for key pressed enter in input field
   *
   * @param {Object} event event triggered by input field
   */
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  /**
   * Handles the submission in enter text in input field
   *
   * @param {Object} event event triggered by form
   */
  handleSubmit = (event) => {
    event.preventDefault();

    const { todoText } = this.state;

    //if input text is blank do not add
    if (!todoText) {
      return;
    }

    const { submit, isSearch } = this.props;

    submit(todoText);

    //input is cleared after submission but not cleared when we are searching
    if (!isSearch) {
      this.setState({ todoText: '' });
    }
  }

  /**
   *Handle the change in input field
   *
   * @param {Object} event event triggered by input field when something is changed
   */
  handleChange = (event) => {
    this.setState({
      todoText: event.target.value
    });

    const { edit, resetEdit, isSearch, submit } = this.props;

    if (edit) {
      resetEdit();
    }

    //if searching instantly submit so that list is filtered
    if (isSearch) {
      submit(event.target.value);
    }
  }

  render() {
    const { todoText } = this.state;
    const { btnText, edit, placeholderText } = this.props;
    const text = edit ? edit.title : todoText;

    return (
      <div className='inputBar input-group mb-3'>
        <input
          type='text'
          value={text}
          className="form-control"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholderText}
        />

        <div className="input-group-append">
          <button
            className='btn btn-primary'
            onClick={this.handleSubmit}
          >
            {btnText}
          </button>
        </div>
      </div>
    );
  }
}

export default InputBar;