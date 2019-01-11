import React from 'react';
import TodoList from './TodoList';

class TodoBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(event) {

  }

  render() {
    const todos = this.props.todos;
    const changeCompletion = this.props.changeCompletion;
    return (
      <div>
        <TodoList
          todos={todos}
          changeCompletion={changeCompletion}
          filter={this.props.filter}
          deleteTodoItem={this.props.deleteTodoItem}
          editTodoItem={this.props.editTodoItem}
        />
        <button>Reset</button>
      </div>
    );
  }
}

export default TodoBox;