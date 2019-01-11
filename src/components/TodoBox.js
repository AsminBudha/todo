import React from 'react';
import TodoList from './TodoList';

class TodoBox extends React.Component {

  render() {
    const todos = this.props.todos;
    const changeCompletion = this.props.changeCompletion;
    return (
      <div className='todoBox'>
        <TodoList
          todos={todos}
          changeCompletion={changeCompletion}
          filter={this.props.filter}
          deleteTodoItem={this.props.deleteTodoItem}
          editTodoItem={this.props.editTodoItem}
        />
      </div>
    );
  }
}

export default TodoBox;