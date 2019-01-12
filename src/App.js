import React from 'react';

import Tabs from './components/Tabs';
import InputBar from './components/InputBar';
import TodoList from './components/TodoList';

import './assets/css/';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      tab: -1,
      edit: null,
      editIndex: null,
      search: '',
    };

    this.startEdit = false;
  }

  /**
   * Add or edit todo item
   *
   * @param {string} todo
   */
  addTodo = (todo) => {
    let todos = this.state.todos.slice();
    const currentDate = new Date().toISOString();

    //if todo is to be edited
    if (this.state.editIndex != null) {
      todos[this.state.editIndex].title = todo;
      todos[this.state.editIndex].createdAt = currentDate;
    }
    else {//else todo is to be added
      this.idGenerate++;
      const obj = {
        id: this.idGenerate,
        title: todo,
        isCompleted: false,
        createdAt: currentDate
      };
      todos = [obj, ...todos];
    }

    this.setState({
      todos: todos
    });

    //remove edit and editIndex since edit has been done
    this.resetEdit();
  }

  /**
   * Sets edit and editIndex to null so that it doesnot change state to edition
   */
  resetEdit = () => {
    this.setState({
      edit: null,
      editIndex: null
    });
  }

  /**
   * Change todo item with index to completed or incompleted.
   *
   * @param {int} index
   * @param {bool} isCompleted
   */
  changeCompletion = (index, isCompleted) => {
    const todos = this.state.todos.slice();

    todos[index].isCompleted = isCompleted;
    this.setState({ todos });
  }

  /**
   * Change current tab being selected
   * tab is based upon contants in utils file
   *
   * @param {int} tab changed indicator of current tab
   */
  changeTab = (tab) => {
    this.setState({ tab });
  }

  /**
   * Delete todo item with index index in state:todos
   *
   * @param {int} index index of item to be deleted
   */
  deleteTodoItem = (index) => {
    //Reset the edit if current editing item is deleted
    if (this.state.editIndex === index) {
      this.resetEdit();
    }
    const REMOVE_SINGLE_ELEMENT = 1;
    const todos = this.state.todos.slice();

    todos.splice(index, REMOVE_SINGLE_ELEMENT);
    this.setState({ todos: todos });
  }

  /**
   * Set state with pattern which can be use to filter the todo list
   *
   * @param {string} pattern string to be used to filter todo list
   */
  search = (pattern) => {
    this.setState({
      search: pattern
    })
  }

  /**
   * Store index and object in state which is going to be edited
   *
   * @param {int} index index of todo item to be  edited
   */
  editTodoItem = (index) => {
    this.setState({
      edit: this.state.todos[index],
      editIndex: index
    })

    this.startEdit = true;
  }

  /**
   * Set edit object which being edited to null so that value can be changed in input field
   */
  editAlreadyUsed = () => {
    this.setState({ edit: null });
  }

  componentDidMount() {
    //if data is already in local storage use it
    const storageData = window.localStorage.getItem('todoData');
    const todos = storageData ? JSON.parse(storageData) : [];
    this.setState({
      todos
    })

    //stores track of last given id for todo item
    this.idGenerate = parseInt(window.localStorage.getItem('idGenerator')) || 0;

    //store data when tab is closing
    window.addEventListener('beforeunload', (e) => {
      window.localStorage.clear();
      window.localStorage.setItem('idGenerator', this.idGenerate.toString());
      window.localStorage.setItem('todoData', JSON.stringify(this.state.todos));
    })
  }

  render() {
    const { todos, editIndex } = this.state;
    const editToogle = this.startEdit;
    const btnText = editIndex != null ? 'Save' : 'Add';

    this.startEdit = false;

    return (
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
          btnText={btnText}
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