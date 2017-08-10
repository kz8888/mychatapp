import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import logo from './logo.svg';
import './App.css';

class Store {
    @observable
    items = [];
};

const todoStore = new Store();

@observer
class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello World!</h2>
        </div>
        <h3>TODO</h3>
        <TodoList items={todoStore.items} />
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={text => this.todoInput = text} placeholder="text" />
          <button>{'Add #' + (todoStore.items.length + 1)}</button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.todoInput.value,
      id: Date.now()
    };
    
    todoStore.items.push(newItem);
    this.todoInput.value = '';
  }
}

@observer
class TodoList extends Component {
  render() {
    return (
      <ul>
        {todoStore.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default ToDoApp;