import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';
import Common from '../constants/common';

/**
 * Renders list items.
 *
 * @param {Object} props
 */
const TodoList = (props) => {

  const {
    todos,
    filter,
    startEdit,
    deleteTodoItem,
    handleTodoChecked,
  } = props;

  const todoItems = todos.map((item, index) => {
    const itemCopy = { ...item };

    itemCopy.index = index;

    if (filter === Common.COMPLETED && !item.isCompleted) {
      return '';
    }

    if (filter === Common.REMAINING && item.isCompleted) {
      return '';
    }

    return (
      <li key={item.id} className='list-group-item'>
        {
          <TodoItem
            item={itemCopy}
            startEdit={startEdit}
            deleteTodoItem={deleteTodoItem}
            handleTodoChecked={handleTodoChecked}
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
};

TodoList.propTypes = {
  filter: PropTypes.number.isRequired,
  startEdit: PropTypes.func.isRequired,
  deleteTodoItem: PropTypes.func.isRequired,
  handleTodoChecked: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
