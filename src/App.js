import React from 'react';
import { Spring } from 'react-spring';

import Tabs from './components/Tabs';
import InputBar from './components/InputBar';
import TodoList from './components/TodoList';

import './assets/css/';
import http from './services/http';
import Common from './constants/common';

/**
 *Main class which handles overall app functionality and rendering
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {

  /**
   *
   *
   * @param {Object} props Object passed when intance is created.
   * @memberof App
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      tab: Common.HOME,
      editIndex: null,
      search: null,
    };

  }

  /**
   * Add todo item.
   *
   * @param {string} todo
   */
  addTodo = (todo) => {
    let todos = this.state.todos.map((item) => ({ ...item }));
    const currentDate = new Date().toISOString();

    this.idGenerate++;
    const obj = {
      id: this.idGenerate,
      title: todo,
      isCompleted: false,
      createdAt: currentDate
    };
    const todoData = http.post(obj);

    todoData.then(() => {
      todos = [obj, ...todos];
      this.setState({
        todos
      });
    });
  }

  /**
   * Edit todo item.
   *
   * @param {string} todo
   */
  editTodo = (todo) => {
    const todos = this.state.todos.map((item) => ({ ...item }));
    const currentDate = new Date().toISOString();
    const { editIndex } = this.state;

    const obj = { ...todos[editIndex], title: todo, createdAt: currentDate };

    http.edit(todos[editIndex].id, obj).then(() => {
      todos[editIndex].title = todo;
      todos[editIndex].createdAt = currentDate;

      this.setState({
        todos: [...todos],
        editIndex: null
      });
    });
  }

  /**
   * Change todo item with index to completed or incompleted.
   *
   * @param {int} index
   * @param {bool} isCompleted
   */
  handleTodoChecked = (index, isCompleted) => {
    const todos = this.state.todos.map((item) => ({ ...item }));

    todos[index].isCompleted = isCompleted;
    this.setState({ todos });
  }

  /**
   * Change current tab being selected.
   * Tab is based upon contants in utils file.
   *
   * @param {int} tab Changed indicator of current tab.
   */
  changeTab = (tab) => {
    this.setState({ tab });
  }

  /**
   * Delete todo item with index index in state:todos.
   *
   * @param {int} index Index of item to be deleted.
   */
  deleteTodoItem = (index) => {
    // Reset the edit if current editing item is deleted
    this.setState({
      editIndex: null
    });

    const REMOVE_SINGLE_ELEMENT = 1;
    const todos = this.state.todos.map((item) => ({ ...item }));

    http.remove(todos[index].id).then(() => {
      todos.splice(index, REMOVE_SINGLE_ELEMENT);
      this.setState({ todos });
    });
  }

  /**
   * Set state with pattern which can be use to filter the todo list.
   *
   * @param {string} pattern String to be used to filter todo list.
   */
  search = (pattern) => {
    if (pattern) {
      const searchedQuery = http.search(pattern);

      searchedQuery
        .then((response) => {
          this.setState({
            search: response.data
          });
        });
    } else {
      this.setState({
        search: null
      });
    }
  }

  /**
   * Store index and object in state which is going to be edited.
   *
   * @param {int} index Index of todo item to be  edited.
   */
  startEdit = (index) => {
    this.setState({
      editIndex: index
    });
  }

  /**
   *
   * @memberof App
   */
  componentDidMount() {
    const todoData = http.get();

    // Retrieve data from server after component is mounted and set into state
    todoData.then((response) => {
      const todos = response.data.reverse();

      // stores track of last given id for todo item
      this.idGenerate = todos[0] ? todos[0].id : 0;

      this.setState({
        todos
      });
    });
  }

  /**
   *
   * @returns JSX to be rendered.
   * @memberof App
   */
  render() {
    const { todos, editIndex, tab, search } = this.state;
    const btnText = editIndex !== null ? 'Save' : 'Add';
    const todoData = search || todos;

    const editionObject = editIndex !== null ? { ...todos[editIndex] } : null;

    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ duration: 1000 }}
      >
        {props => (
          <div style={props} className='myContainer'>
            <Tabs changeTab={this.changeTab} tab={tab} />

            <InputBar
              isSearch={true}
              btnText={'Search'}
              submit={this.search}
              placeholderText='Search here'
            />

            <InputBar
              submit={this.addTodo}
              editTodo={this.editTodo}
              editionObject={editionObject}
              placeholderText='Enter Todo Here'
              btnText={btnText}
            />

            <TodoList
              todos={todoData}
              filter={tab}
              search={search}
              startEdit={this.startEdit}
              deleteTodoItem={this.deleteTodoItem}
              handleTodoChecked={this.handleTodoChecked}
            />
          </div>
        )}
      </Spring >
    );
  }
}

/**
 *
 * @param {Object<React.Component>} Component
 */
const withAppTitle = (Component) =>
  (props) => (
    <div className={'container-fluid wrapper'}>
      <h1 className='app-name'>Todo App</h1>
      <Component {...props} />
    </div>
  );

export default withAppTitle(App);
