import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  /**
   * handle when item completion radio is checked or unchecked
   * @param {Object} event event triggered by radio
   * @returns {undefined}
   */
  handleChecked = (event) => {
    const { changeCompletion, item } = this.props;

    changeCompletion(item.index, this.state.checked);

    this.setState({
      checked: !this.state.checked
    });

  }

  render() {
    const { item, editTodoItem, deleteTodoItem } = this.props;
    const text = item.title;
    const isComplete = item.isCompleted ? 'checked' : '';

    return (
      <div className='row'>
        <div className='container-content-v-center left col-sm-8'>
          <input
            type='radio'
            className='left'
            checked={isComplete}
            onChange={this.handleChecked} />
          <div className='left todo-text'>
            <p className={item.isCompleted ? 'completed-item' : ''}>{text}</p>
            <small className='text-muted'>Created At: {item.createdAt}</small>
          </div>
        </div>
        <span className="badge badge-primary badge-pill action-btns col-sm-4">
          <button
            className='btn btn-primary'
            onClick={(event) => { console.log(item); editTodoItem(item.index); }}
          >
            Edit
          </button>
          <button
            className='btn btn-primary'
            onClick={(event) => deleteTodoItem(item.index)}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default TodoItem;