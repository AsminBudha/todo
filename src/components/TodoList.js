import React from 'react';

import TodoItem from './TodoItem';
import { COMPLETED, REMAINING } from '../constants/Utils';

const TodoList = (props) => {
  const {
    todos,
    filter,
    search,
    editTodoItem,
    deleteTodoItem,
    changeCompletion,
  } = props;
  const pat = new RegExp(search);
  const todoItems = todos.map((item) => {
    if (filter === COMPLETED && !item.isCompleted) {
      return '';
    }

    if (filter === REMAINING && item.isCompleted) {
      return '';
    }

    if (pat && !pat.test(item.title)) {
      return '';
    }
    return (
      <li key={item.id.toString()} className='list-group-item'>
        {
          <TodoItem
            item={item}
            editTodoItem={editTodoItem}
            deleteTodoItem={deleteTodoItem}
            changeCompletion={changeCompletion}
          />
        }
      </li>
    );
  });

  return (
    <ul className='list-group todo-ul'>
      {todoItems}
    </ul>
  );
}

export default TodoList;