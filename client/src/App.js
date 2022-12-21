import { useState, useEffect } from "react";

const API = "http://localhost:8080"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
    console.log(todos)
  }, []);

  const getTodos = () => {
    fetch(API + "/todo")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  };
  return (
    <div className="App">
        <h1>Hello</h1>
        <h3>Todos</h3>
        <div className="addTask">ADD TASK</div>

        <div className="todos">
          {todos.map(todo => (
            <div className={ "todo " + (todo.completed ? "completed" : "")} key = { todo.id }> 
              <div className="checkbox"></div>
              <div className="taskDetails">{ todo.task }</div>
              <div className="modifyTask">ch</div>
              <div className="deleteTask">x</div>
            </div>
          ))}
          
        </div>
    </div>
  );
}

export default App;
