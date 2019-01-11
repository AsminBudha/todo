import React from 'react';
import TodoItem from './TodoItem';
import { COMPLETED, REMAINING } from '../constants/Utils';


class TodoList extends React.Component {

  render() {
    const todos = this.props.todos;
    const changeCompletion = this.props.changeCompletion;

    const filter = this.props.filter;

    const todoItems = todos.map((item, index) => {
      item.index = index;
      if (filter === COMPLETED && !item.isCompleted) {
        return '';
      }
      else if (filter === REMAINING && item.isCompleted) {
        return '';
      }
      return (<li key={index.toString()} className='list-group-item'>

        {<TodoItem
          item={item}
          changeCompletion={changeCompletion}
          deleteTodoItem={this.props.deleteTodoItem}
          editTodoItem={this.props.editTodoItem}
        />}
      </li>);
    });

    return (
      <ul className='list-group'>
        {todoItems}
      </ul>
    );
  }
}

export default TodoList;