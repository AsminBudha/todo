import React from 'react';

/**
 * Renders single item todo item.
 *
 * @class TodoItem
 * @extends {React.Component}
 */
class TodoItem extends React.Component {
  /**
   * Creates an instance of TodoItem.
   *
   * @param {*} props
   * @memberof TodoItem
   */
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  /**
   * Handle when item completion radio is checked or unchecked.
   *
   */
  handleChecked = () => {
    const { handleTodoChecked, item } = this.props;
    const { checked } = this.state;

    handleTodoChecked(item.index, checked);

    this.setState({
      checked: !checked
    });

  }

  /**
   * Render component to show list of items.
   *
   * @returns
   * @memberof TodoItem
   */
  render() {
    const { item: { index, title, isCompleted, createdAt }, startEdit, deleteTodoItem } = this.props;
    const isComplete = isCompleted ? 'checked' : '';
    const titleClass = isCompleted ? 'completed-item' : '';
    const localeDate = new Date(createdAt).toLocaleString();

    return (
      <div className='row'>
        <div className='container-content-v-center left col-sm-8'>
          <input
            type='radio'
            className='left'
            checked={isComplete}
            onChange={this.handleChecked} />

          <div className='left todo-text'>
            <p className={titleClass}>{title}</p>
            <small className='text-muted'>Created At: {localeDate}</small>
          </div>
        </div>
        <span className="badge badge-primary badge-pill action-btns col-sm-4">
          <button
            className='btn btn-primary'
            onClick={() => startEdit(index)}
          >
            Edit
          </button>
          <button
            className='btn btn-primary'
            onClick={() => deleteTodoItem(index)}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default TodoItem;
