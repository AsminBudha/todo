import React from 'react';

/**
 * Component with Input Field and Button in horizontal.
 *
 * @class InputBar
 * @extends {React.Component}
 */
class InputBar extends React.Component {
  /**
   *
   * @param {*} props
   * @memberof InputBar
   */
  constructor(props) {
    super(props);

    this.state = {
      todoText: ''
    };

    this.isOnEdit = false;
    this.currentEditingId = null;
  }

  /**
   * Checks for key pressed enter in input field.
   *
   * @param {Object} event Event triggered by input field.
   * @memberof InputBar
   */
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  /**
   * Submission handler for input field.
   *
   * @param {Object} event Event triggered by form.
   * @memberof InputBar
   */
  handleSubmit = (event) => {
    event.preventDefault();

    const { todoText } = this.state;

    // if input text is blank do not add
    if (!todoText) {
      return;
    }

    const { submit, isSearch, editTodo } = this.props;

    if (this.isOnEdit) {
      editTodo(todoText);
      this.isOnEdit = false;
      this.currentEditingId = null;
    } else {
      submit(todoText);
    }

    // input is cleared after submission but not cleared when we are searching
    if (!isSearch) {
      this.setState({ todoText: '' });
    }
  }

  /**
   * Handle the change in input field.
   *
   * @param {Object} event Event triggered by input field when something is changed.
   */
  handleChange = (event) => {
    this.setState({
      todoText: event.target.value
    });

    const { isSearch, submit } = this.props;

    // if searching instantly submit so that list is filtered
    if (isSearch) {
      submit(event.target.value);
    }

  }

  /**
   * This function is automatically called to render JSX of compoenent.
   *
   * @returns
   * @memberof InputBar
   */
  render() {
    const { todoText } = this.state;
    const { btnText, placeholderText, editionObject } = this.props;
    let text = todoText;

    if (editionObject && this.currentEditingId !== editionObject.id) {
      this.isOnEdit = true;
      this.currentEditingId = editionObject.id;
      text = editionObject.title;
    } else if (!editionObject) {
      this.isOnEdit = false;
      this.currentEditingId = null;
    }

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
