import { useState, useEffect } from "react";

const API = "http://localhost:8080"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  let count = 0

  useEffect(() => {
    getTodos();
  }, [todos]);

  const getTodos = () => {
    fetch(API + "/todo")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  };

  const toggleComplete = async id => {
    const toggledTodo = await fetch(API + "/todo/complete/" + id, {method : "PUT"})
      .then(res => res.json())
    
    setTodos(data => data.map(todo => {
      if (todo.id === toggledTodo.id) {
        todo.completed = toggledTodo.completed;
      }
      return todo;
    }));

  };
  return (
    <div className="App">
        <h1>Hello</h1>
        <h3>Todos</h3>
        <div className="addTask">ADD TASK</div>

        <div className="todos">
          {todos.length > 0 ? todos.map(todo => (
            <div className={ "todo " + (todo.completed ? "completed" : "")} key = { todo.id } onClick = {() => toggleComplete(todo.id)}> 
              <div className="checkbox"></div>
              <div className="taskDetails">{ todo.task }</div>
              <div className="modifyTask">ch</div>
              <div className="deleteTask">x</div>
            </div>
          )) : "A"}
          
        </div>
    </div>
  );
}

export default App;
