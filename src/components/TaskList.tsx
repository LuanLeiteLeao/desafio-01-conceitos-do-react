import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";
import React from "react";
import { TaskInterface } from "./TaskInterface";

interface IProps {}

interface IState {
  tasks: TaskInterface[];
  newTaskTitle: string;
}

export class TaskList extends React.Component<IProps,IState> {
  constructor(props: any) {
    super(props);
    this.state = {tasks:[],newTaskTitle:""};
  }

  getRandomInt() {
    const max_number = 100000000;
    return Math.floor(Math.random() * max_number);
  }

  clearNewTaskTitle() {
    this.setState({ newTaskTitle: "" });
  }

  handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    if (this.state.newTaskTitle !== "") {
      const newTask ={
        id: this.getRandomInt(),
        title: this.state.newTaskTitle,
        isComplete: false,
      };
      
      this.setState({ tasks:[...this.state.tasks, newTask] });
      this.clearNewTaskTitle();
    }
  }

  handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const updateTasks = this.state.tasks.map((task) => {
      if (task.id == id) {
        task.isComplete = !task.isComplete ? true : false;
      }
      return task;
    });

    this.setState({ tasks:updateTasks });
  }

  handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const updateTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks:updateTasks});
  }

  render() {
    return (
      <section className="task-list container">
        <header>
          <h2>Minhas tasks</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Adicionar novo todo"
              onChange={(e) => this.setState({newTaskTitle:e.target.value})}
              value={this.state.newTaskTitle}
            />
            <button
              type="submit"
              data-testid="add-task-button"
              onClick={()=>this.handleCreateNewTask()}
            >
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </div>
        </header>

        <main>
          <ul>
            {this.state.tasks.map((task) => (
              <li key={task.id}>
                <div
                  className={task.isComplete ? "completed" : ""}
                  data-testid="task"
                >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => this.handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button
                  type="button"
                  data-testid="remove-task-button"
                  onClick={() => this.handleRemoveTask(task.id)}
                >
                  <FiTrash size={16} />
                </button>
              </li>
            ))}
          </ul>
        </main>
      </section>
    );
  }
}
