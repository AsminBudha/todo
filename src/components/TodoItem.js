import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };

    this.handleChecked = this.handleChecked.bind(this);
  }

  handleChecked(event) {
    const isChecked = this.state.checked;
    this.setState({
      checked: !isChecked
    });

    const changeCompletion = this.props.changeCompletion;

    changeCompletion(this.props.item.index, isChecked);
  }

  render() {
    const item = this.props.item;

    const text = item.title;
    const isComplete = item.isCompleted ? 'checked' : '';

    return (
      <>
        {text} Created At: {item.createdAt}
        <input type='radio' checked={isComplete} onChange={this.handleChecked} />
        <button onClick={(event) => this.props.deleteTodoItem(item.index)}>Delete</button>
        <button onClick={(event) => this.props.editTodoItem(item.index)}>Edit</button>

      </>
    );
  }
}

export default TodoItem;