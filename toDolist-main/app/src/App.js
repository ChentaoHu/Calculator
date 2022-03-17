import React, { useState, useEffect } from 'react';
import "./App.css";
import Form from "./Component/Form";
import Login from "./Component/Login";
import TodoList from "./Component/TodoList";
import Register from "./Component/Register";

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('All')
  const [filter, setFilter] = useState([])
  const [loginStatus, setLoginStatus] = useState(false)
  const [registerStatus, setRegisterStatus] = useState(false)


  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const deleteSingleTodo = (id) => {
    setTodos(todos.filter((e) => e.id !== id))
  }

  function filterHandler() {
    switch (status) {
      case 'completed':
        setFilter(todos.filter(todo => todo.complete === true))
        break;
      case 'uncompleted':
        setFilter(todos.filter(todo => todo.complete === false))
        break
      default:
        setFilter(todos)
        break
    }
  }

  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <div className="Info">
        {!loginStatus ?
          <div>
            {registerStatus?
              <Login setLoginStatus={setLoginStatus}/>
            :
              <Register setRegisterStatus={setRegisterStatus}/>
            }
          </div>
        :
          <div>
            <Form className="Form" setTodos={setTodos} todos={todos} setFilter={setFilter} filterHandler={filterHandler} status={status} setStatus={setStatus} />
            <TodoList className="todolist" toggleTodo={toggleTodo} deleteSingleTodo={deleteSingleTodo} filter={filter} />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
