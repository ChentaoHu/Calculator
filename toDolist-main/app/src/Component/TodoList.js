import React from 'react';
import Todo from './Todo'


function TodoList ({toggleTodo, deleteSingleTodo, filter}){
  return (
        filter.map(todo => {
          return <Todo todo ={todo} toggleTodo ={toggleTodo}  deleteSingleTodo={deleteSingleTodo} filter={filter}/>
        })
  )
}

export default TodoList