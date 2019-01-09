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
    console.log('From Submit', this.props.edit)
    const addTodo = this.props.addTodo;
    addTodo(this.state.todoText);

    this.setState({ todoText: '' });
    this.editShowed = false;
  }

  handleChange(event) {
    this.setState({
      todoText: event.target.value
    });

  }

  editStored = () => {
    // this.setState({
    //   todoText: this.props.edit.title
    // })

    // this.props.resetEdit();
    // console.log('Edit', this.counter);
  }


  render() {

    let text = this.state.todoText;
    // console.log('Checking', this.props.edit);
    if (this.props.edit && !this.editShowed) {
      // this.editStored();
      text = this.props.edit.title;
      // this.props.resetEdit();
      this.editShowed = true;
    }

    this.counter++;
    return (
      <div>
        <input type='text' value={text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
        <button onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}

export default InputBar;