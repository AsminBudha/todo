import React from 'react';

import './assets/css/';
import Tabs from './components/Tabs';
import InputBar from './components/InputBar';
import TodoList from './components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);

    //if data is already in local storage use it
    const storageData = window.localStorage.getItem('todoData');
    const todos = storageData ? JSON.parse(storageData) : [];

    //stores track of last given id for todo item
    this.idGenerate = parseInt(window.localStorage.getItem('idGenerator')) || 0;

    this.state = {
      todos: todos,
      tab: -1,
      edit: null,
      editIndex: null,
      search: '',
    };

    this.startEdit = false;
  }

  /**
   * add or edit todo item
   * @param {string} todo
   * @returns {undefined}
   */
  addTodo = (todo) => {
    const todos = this.state.todos.slice();
    const date = new Date().toLocaleString();

    //if todo is to be edited
    if (this.state.editIndex != null) {
      todos[this.state.editIndex].title = todo;
      todos[this.state.editIndex].createdAt = date;
    }
    else {//else todo is to be added
      this.idGenerate++;
      todos.unshift({
        id: this.idGenerate,
        title: todo,
        isCompleted: false,
        createdAt: date
      });
    }

    this.setState({
      todos: todos
    });

    //remove edit and editIndex since edit has been done
    this.resetEdit();
  }

  /**
   * Sets edit and editIndex to null so that it doesnot change state to edition
   * @returns {undefined}
   */
  resetEdit = () => {
    this.setState({
      edit: null,
      editIndex: null
    });
  }

  /**
   * Change todo item with index to completed or incompleted.
   * @param {int} index
   * @param {bool} isCompleted
   * @returns {undefined}
   */
  changeCompletion = (index, isCompleted) => {
    const todos = this.state.todos.slice();

    todos[index].isCompleted = isCompleted;
    this.setState({ todos: todos });
  }

  /**
   * Change current tab being selected
   * tab is based upon contants in utils file
   * @param {int} tab changed indicator ofr current tab
   * @returns {undefined}
   */
  changeTab = (tab) => {
    this.setState({ tab });
  }

  /**
   * delete todo item with index index in state:todos
   * @param {int} index index of item to be deleted
   * @returns {undefined}
   */
  deleteTodoItem = (index) => {
    //Reset the edit if current editing item is deleted
    if (this.state.editIndex === index) {
      this.resetEdit();
    }

    const todos = this.state.todos.slice();

    todos.splice(index, 1);
    this.setState({ todos: todos });
  }

  /**
   * set state with pattern which can be use to filter the todo list
   * @param {string} pattern string to be used to filter todo list
   * @returns {undefined}
   */
  search = (pattern) => {
    this.setState({
      search: pattern
    })
  }

  /**
   * store index and object in state which is going to be edited
   * @param {int} index index of todo item to be  edited
   * @returns {undefined}
   */
  editTodoItem = (index) => {
    this.setState({
      edit: this.state.todos[index],
      editIndex: index
    })

    this.startEdit = true;
  }

  /**
   * set edit object which being edited to null so that value can be changed in input field
   * @returns {undefined}
   */
  editAlreadyUsed = () => {
    this.setState({ edit: null });
  }

  render() {
    window.localStorage.clear();
    window.localStorage.setItem('idGenerator', this.idGenerate.toString());
    window.localStorage.setItem('todoData', JSON.stringify(this.state.todos));

    const { todos } = this.state;
    const editToogle = this.startEdit;

    this.startEdit = false;

    return (
      <>
        <div className='myContainer'>
          <Tabs changeTab={this.changeTab} tab={this.state.tab} />

          <InputBar
            isSearch={true}
            btnText={'Search'}
            submit={this.search}
            placeholderText={'Search here'}
          />

          <InputBar
            submit={this.addTodo}
            edit={this.state.edit}
            startEdit={editToogle}
            resetEdit={this.editAlreadyUsed}
            placeholderText={'Enter Todo Here'}
            btnText={this.state.editIndex != null ? 'Save' : 'Add'}
          />

          <TodoList
            todos={todos}
            filter={this.state.tab}
            search={this.state.search}
            editTodoItem={this.editTodoItem}
            deleteTodoItem={this.deleteTodoItem}
            changeCompletion={this.changeCompletion}
          />
        </div>
      </>
    );
  }
}

const withAppTitle = (Component) =>
  (props) => (
    <div className={'container-fluid wrapper'}>
      <h1 className='app-name'>Todo App</h1>
      <Component {...props} />
    </div>
  )

export default withAppTitle(App);