import { useState, useEffect } from "react";

const API = "http://localhost:8080"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(API + "/todo")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  };

  const toggleComplete = async id => {
    const toggledTodo = await fetch(API + "/todo/complete/" + id, {method : "PUT"})
      .then(res => res.json());
    setTodos(toggledTodo);

  };

  const deleteTodo = async id => {
    const updatedTodos = await fetch(API + "/todo/delete/" + id, {method : "DELETE"})
      .then(res => res.json());
    setTodos(updatedTodos)
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
              <div className="deleteTask" onClick={() => deleteTodo(todo.id)}>x</div>
            </div>
          )) : "You Have No Tasks!"}
          
        </div>
    </div>
  );
}

export default App;
