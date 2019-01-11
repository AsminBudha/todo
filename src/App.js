import React from 'react';
import InputBar from './components/InputBar';
import TodoBox from './components/TodoBox';
import Tabs from './components/Tabs';

class App extends React.Component {
  constructor(props) {
    super(props);
    const todos = [];

    this.state = {
      todos: todos,
      tab: -1,
      edit: null,
      editIndex: null
    };

  }

  addTodo = (todo) => {
    console.log(todo, this.state.editIndex);
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
    const todos = this.state.todos.slice();

    todos.splice(index, 1);

    this.setState({ todos: todos });
  }

  editTodoItem = (index) => {

    this.setState({
      edit: this.state.todos[index],
      editIndex: index
    })
  }

  render() {
    const todos = this.state.todos;
    return (
      <div>
        <Tabs changeTab={this.changeTab} />
        <InputBar addTodo={this.addTodo} edit={this.state.edit} resetEdit={this.resetEdit} />

        <TodoBox
          todos={todos}
          changeCompletion={this.changeCompletion}
          filter={this.state.tab}
          deleteTodoItem={this.deleteTodoItem}
          editTodoItem={this.editTodoItem}
        />
      </div>
    );
  }
}
export default App;