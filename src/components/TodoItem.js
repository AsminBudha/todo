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
      <div className='row'>
        <div className='container-content-v-center left col-sm-8'>
          <input className='left' type='radio' checked={isComplete} onChange={this.handleChecked} />
          <div className='left todo-text'>
            <p className={item.isCompleted ? 'completed-item' : ''}>{text}</p>
            <small className='text-muted'>Created At: {item.createdAt}</small>

          </div>

        </div>

        <span className="badge badge-primary badge-pill action-btns col-sm-4">
          <button className='btn btn-primary' onClick={(event) => this.props.editTodoItem(item.index)}>Edit</button>
          <button className='btn btn-primary' onClick={(event) => this.props.deleteTodoItem(item.index)}>Delete</button>
        </span>


      </div>
    );
  }
}

export default TodoItem;