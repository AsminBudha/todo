import React from 'react';

class InputBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todoText: ''
    }
  }

  /**
   * checks for key pressed enter in input field
   * @param {Object} event event triggered by input field
   * @returns {undefined}
   */
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  /**
   * handles the submission in enter text in input field
   * @param {Object} event event triggered by form
   * @returns {undefined}
   */
  handleSubmit = (event) => {
    event.preventDefault();

    //if input text is blank do not add
    if (!this.state.todoText) {
      return;
    }

    const addTodo = this.props.submit;

    addTodo(this.state.todoText);

    //input is cleared after submission but not cleared when we are searching
    if (!this.props.isSearch) {
      this.setState({ todoText: '' });
    }
  }

  /**
   *handle the change in input field
   * @param {Object} event event triggered by input field when something is changed
   * @returns {undefined}
   */
  handleChange = (event) => {
    this.setState({
      todoText: event.target.value
    });

    if (this.props.edit != null) {
      this.props.resetEdit();
    }

    //if searching instantly submit so that list is filtered
    if (this.props.isSearch) {
      this.props.submit(event.target.value);
    }
  }

  render() {
    const text = this.props.edit ? this.props.edit.title : this.state.todoText;

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
            {this.props.btnText}
          </button>
        </div>
      </div>
    );
  }
}

export default InputBar;