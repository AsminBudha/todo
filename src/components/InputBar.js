import React from 'react';
import PropTypes from 'prop-types';

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

    const { handleSubmit } = this.props;

    handleSubmit();

  }

  /**
   * Handle the change in input field.
   *
   * @param {Object} event Event triggered by input field when something is changed.
   */
  handleChange = (event) => {
    this.props.handleChange(event.target.value);
  }

  /**
   * This function is automatically called to render JSX of compoenent.
   *
   * @returns
   * @memberof InputBar
   */
  render() {
    const { btnText, placeholderText, todoText } = this.props;

    return (
      <div className='inputBar input-group mb-3'>
        <input
          type='text'
          value={todoText}
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

InputBar.propTypes = {
  isSearch: PropTypes.bool,
  editTodo: PropTypes.func,
  editionObject: PropTypes.object,
  submit: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
};

export default InputBar;

