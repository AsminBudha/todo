import React from 'react';

import TodoItem from './TodoItem';
import { COMPLETED, REMAINING } from '../constants/common';

const TodoList = (props) => {
  const {
    todos,
    filter,
    search,
    editTodoItem,
    deleteTodoItem,
    changeCompletion,
  } = props;
  const pattern = new RegExp(search);
  const todoItems = todos.map((item, index) => {
    const itemCopy = { ...item };
    itemCopy.index = index;

    if (filter === COMPLETED && !item.isCompleted) {
      return '';
    }

    if (filter === REMAINING && item.isCompleted) {
      return '';
    }

    if (pattern && !pattern.test(item.title)) {
      return '';
    }
    return (
      <li key={item.id} className='list-group-item'>
        {
          <TodoItem
            item={itemCopy}
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
