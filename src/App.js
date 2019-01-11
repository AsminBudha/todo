import React from 'react';
import InputBar from './components/InputBar';
import TodoBox from './components/TodoBox';
import Tabs from './components/Tabs';
import './assets/css/';

class App extends React.Component {
  constructor(props) {
    super(props);

    const storageData = window.localStorage.getItem('todoData');
    const todos = storageData ? JSON.parse(storageData) : [];

    this.state = {
      todos: todos,
      tab: -1,
      edit: null,
      editIndex: null
    };

    this.startEdit = false;
  }

  addTodo = (todo) => {
    const todos = this.state.todos.slice();

    const date = new Date().toLocaleString();

    if (this.state.editIndex != null) {
      todos[this.state.editIndex].title = todo;
      todos[this.state.editIndex].createdAt = date;

    }
    else {
      todos.unshift({
        title: todo,
        isCompleted: false,
        createdAt: date
      });
    }

    this.setState({
      todos: todos
    });
    this.resetEdit();
  }

  resetEdit = () => {
    this.setState({
      edit: null,
      editIndex: null
    });
  }

  changeCompletion = (index, isCompleted) => {
    const todos = this.state.todos.slice();
    todos[index].isCompleted = isCompleted;
    this.setState({ todos: todos });
  }

  handleReset = () => {
    this.setState({
      todos: []
    });
  }

  changeTab = (tab) => {
    this.setState({ tab: tab });
  }

  deleteTodoItem = (index) => {

    /**
     * Reset the edit if current editing item is deleted
     */
    if (this.state.editIndex == index) {
      this.resetEdit();
    }
    const todos = this.state.todos.slice();

    todos.splice(index, 1);

    this.setState({ todos: todos });

  }

  editTodoItem = (index) => {

    this.setState({
      edit: this.state.todos[index],
      editIndex: index
    })

    this.startEdit = true;
  }

  editAlreadyUsed = () => {
    this.setState({ edit: null });
  }

  render() {

    window.localStorage.clear();
    window.localStorage.setItem('todoData', JSON.stringify(this.state.todos));

    const todos = this.state.todos;

    let className = 'container-fluid wrapper';

    let editToogle = this.startEdit;
    this.startEdit = false;
    return (
      <div className={className}>
        <h1 className='app-name'>Todo App</h1>
        <div className='myContainer'>
          <Tabs changeTab={this.changeTab} tab={this.state.tab} />
          <InputBar
            addTodo={this.addTodo}
            edit={this.state.edit}
            resetEdit={this.editAlreadyUsed}
            startEdit={editToogle}
            btnText={this.state.editIndex != null ? 'Edit' : 'Add'}
          />

          <TodoBox
            todos={todos}
            changeCompletion={this.changeCompletion}
            filter={this.state.tab}
            deleteTodoItem={this.deleteTodoItem}
            editTodoItem={this.editTodoItem}
          />
        </div>

      </div>
    );
  }
}
export default App;