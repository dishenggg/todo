import { useState, useEffect } from "react";
import icon from './img/recycle-bin-line-icon.svg';

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

  const addTodo = async () => {
    const updatedTodos = await fetch(API + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: newTodo
      })
    }).then(res => res.json())
    setNewTodo("");
    setTodos(updatedTodos);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter" && newTodo !== "") {
      addTodo();
    }
  }

  return (
    <div className="App">
        <h1>Hello</h1>
        <h3>Todos</h3>
        
        <div className="addTask">
          <input className="addNewTodo" input="text" placeholder="+ Add New Task" onKeyDown={handleEnterKey} onChange={val => setNewTodo(val.target.value)} value={newTodo}></input>
        </div>

        <div className="todos">
          {todos.length > 0 ? todos.map(todo => (
            <div className={ "todo " + (todo.completed ? "completed" : "")} key = { todo.id }> 
              <div className="checkbox-area" onClick = {() => toggleComplete(todo.id)}> 
                <div className="checkbox" ></div>
              </div>
              <div className="taskDetails">{ todo.task }</div>
              <div className="modifyTask">edit</div>
              <div className="deleteTask" onClick={() => deleteTodo(todo.id)}><img src={icon} alt="trash icon"></img></div>
            </div>
          )) : "You Have No Tasks!"}
          
        </div>
    </div>
  );
}

export default App;
