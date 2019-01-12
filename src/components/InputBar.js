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

    //if input text is blank do not add
    if (!this.state.todoText) {
      return;
    }

    const { submit } = this.props;

    submit(this.state.todoText);

    //input is cleared after submission but not cleared when we are searching
    if (!this.props.isSearch) {
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

    if (this.props.edit) {
      this.props.resetEdit();
    }

    //if searching instantly submit so that list is filtered
    if (this.props.isSearch) {
      this.props.submit(event.target.value);
    }
  }

  render() {
    const { todoText } = this.state;
    const { btnText, edit } = this.props;
    const text = edit ? edit.title : todoText;

    return (
      <div className='inputBar input-group mb-3'>
        <input
          type='text'
          value={text}
          className="form-control"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder={this.props.placeholderText}
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