import React from 'react';
import { useState } from 'react';

const TodosComponent = (props) => {
  const [ todo, setTodo ] = useState("");
  const [ todoList, setTodoList ] = useState([]);

  const updateField = (e) => {
    setTodo(e.currentTarget.value);
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    setTodoList([...todoList, todo]);
    setTodo("");
  }

  function deleteTodoHandler(e) {
    e.preventDefault();
    let removalIdx = e.target.parentElement.id;
    let newList = todoList.filter((ele, idx) => idx !== parseInt(removalIdx))
    setTodoList(newList)
  } 

  let elementList = todoList.map((ele, idx) => {
    return <div 
      className="todo-item-container"
      id={idx} 
      key={idx}
    >
      <li>{ele}</li>
      <button
        onClick={(e) => deleteTodoHandler(e)}
      >delete item</button>
    </div>
  })

  return(
    <div>
      <h2>To-do List</h2>
      <form onSubmit={(e) => handleAddTodo(e)}>
        <input
          placeholder="new todo"
          type="text"
          value={todo}
          onChange={updateField}
        />
        <input
          type="submit"
          value="add"
        />
      </form>
      {elementList}
    </div>
  )
}

export default TodosComponent