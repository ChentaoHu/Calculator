import React, { useRef, useEffect } from 'react';
import { v4 as uuid } from "uuid";

const STORAGE_KEY = 'todoApp.todos'

const Form = (props) => {
  const userInput = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (storedTodos) props.setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props.todos))
  }, [props.todos])

  useEffect(() => {
    props.filterHandler()
  }, [props.todos, props.status])

  function handleAddtodo(e) {
    e.preventDefault()
    const toDoText = userInput.current.value;
    if (toDoText === '') return
    props.setTodos(prev => {
      return [...prev, {id:uuid(), name:toDoText, complete: false}]
    })
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   "todo": {
    //     "text": "bed time"
    //   }
    // });

    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("http://localhost:3001/todos/0", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    userInput.current.value = null
  }

  function deleteTodo(e) {
    e.preventDefault()
    const newTodo = props.todos.filter(todo => !todo.complete)
    props.setTodos(newTodo)
  }

  function statusChange(e) {
    props.setStatus(e.target.value)
  }



  return (
    <form>
      <input ref={userInput} type="text" className="todo-list" />
      <button onClick={handleAddtodo} className="todo-button" type="submit">
        Add Todos
      </button>
      <button className="clear-button" onClick={deleteTodo}>
        Delete Selected Todos
      </button>
      <div>
        <select onChange={statusChange} name="todos"
          className="filter">
          <option value="All">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <h3>There are still {props.todos.filter(todo => !todo.complete).length} things left to do!</h3>
    </form>
  )
}

export default Form;