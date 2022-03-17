import React from 'react'


export default function Todo({todo, toggleTodo,deleteSingleTodo, filter}) {

  function todoClick(){
    toggleTodo(todo.id)
  }

  function deleteClick (){
    deleteSingleTodo(todo.id)
  }
  
  return (
    <div className="todo" >
      <label className={todo.complete ?"completed" : ""}>
        <input type ="checkbox" checked={todo.complete} onChange={todoClick} />
      {todo.name}
        <button onClick ={deleteClick}>x</button>
      </label>
    </div>
  )
}
