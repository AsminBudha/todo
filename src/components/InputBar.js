import React from 'react';

class InputBar extends React.Component {

  constructor(props) {
    super(props);

    let text = '';

    this.state = {
      todoText: text
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.editShowed = false;
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
      return;
    }

  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.todoText === '') {
      return;
    }

    const addTodo = this.props.addTodo;
    addTodo(this.state.todoText);

    this.setState({ todoText: '' });
    this.editShowed = false;
  }

  handleChange(event) {
    this.setState({
      todoText: event.target.value
    });
    this.props.resetEdit();
  }

  render() {

    let text = this.state.todoText;

    if (this.props.edit) {

      text = this.props.edit.title;
      // this.editShowed = true;
    }

    this.counter++;

    return (
      <div className='inputBar input-group mb-3'>
        <input
          className="form-control"
          type='text' value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder='Enter todo here'
        />
        <div className="input-group-append">
          <button className='btn btn-primary' onClick={this.handleSubmit}>{this.props.btnText}</button>
        </div>
      </div>
    );
  }
}

export default InputBar;