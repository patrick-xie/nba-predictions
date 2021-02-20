// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import nbalogo from './logo.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Resolved
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}>
          Current
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </span>
        <span>
          <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2" style={{display: 'inline', padding:'2px'}}>
            {" "}Edit{" "}
          </button>
          <button onClick={() => this.handleDelete(item)} className="btn btn-danger" style={{display: 'inline',  padding:'2px'}}>
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = {title: "", description: "", completed: false};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content" style={{backgroundImage: 'url(' + require('./blurr.jpg') + ')'}}>
        <h1 className="text-white text-center">Sticky Notes</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3" style={{backgroundImage: 'url(' + require('./table.jpg') + ')'}}>
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add note
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
