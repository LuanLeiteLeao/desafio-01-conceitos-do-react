import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";
import React from "react";
import { TaskInterface } from "./TaskInterface";



export function TaskList() {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
  
    function getRandomInt() {
      const max_number = 100000000;
      return Math.floor(Math.random() * max_number);
    }
  
    function clearNewTaskTitle() {
      setNewTaskTitle("");
    }
  
    function handleCreateNewTask() {
      // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
      console.log(newTaskTitle)
      if(newTaskTitle !== ""){
        const newTask = {
          id: getRandomInt(),
          title: newTaskTitle,
          isComplete: false,
        };
    
        setTasks((oldArray) => [...tasks, newTask]);
    
        clearNewTaskTitle();
      }
      
    }
  
    function handleToggleTaskCompletion(id: number) {
      // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
      const updateTasks = tasks.map((task) => {
        if (task.id == id) {
          task.isComplete = !task.isComplete?true:false;
        }
        return task;
      });
  
      setTasks(updateTasks);
    }
  
    function handleRemoveTask(id: number) {
      // Remova uma task da listagem pelo ID
      const updateTasks = tasks.filter((task) => {
        return task.id !== id;
      });
  
      setTasks(updateTasks);
    }
  
    return (
      <section className="task-list container">
        <header>
          <h2>Minhas tasks</h2>
  
          <div className="input-group">
            <input
              type="text"
              placeholder="Adicionar novo todo"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button
              type="submit"
              data-testid="add-task-button"
              onClick={handleCreateNewTask}
            >
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </div>
        </header>
  
        <main>
          <ul>
            {tasks.map((task) => (
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
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>
  
                <button
                  type="button"
                  data-testid="remove-task-button"
                  onClick={() => handleRemoveTask(task.id)}
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
  