import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  /**
   * Handle when item completion radio is checked or unchecked
   *
   * @param {Object} event event triggered by radio
   */
  handleChecked = (event) => {
    const { changeCompletion, item } = this.props;

    changeCompletion(item.index, this.state.checked);

    this.setState({
      checked: !this.state.checked
    });

  }

  render() {
    const { item: { index, title, isCompleted, createdAt }, editTodoItem, deleteTodoItem } = this.props;
    const isComplete = isCompleted ? 'checked' : '';
    const titleClass = isCompleted ? 'completed-item' : ''
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
            onClick={(event) => editTodoItem(index)}
          >
            Edit
          </button>
          <button
            className='btn btn-primary'
            onClick={(event) => deleteTodoItem(index)}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default TodoItem;
