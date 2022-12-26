import { useState, useEffect, useRef } from "react";
import icon from './img/recycle-bin-line-icon.svg';
import Footer from './footer';

//const API = "https://todo-five-phi.vercel.app"
const API = "http://localhost:8080"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(-1);
  const [editedTodo, setEditedTodo] = useState("");
  const [ref, setRef] = useState(undefined);

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
    const updatedTodos = await fetch(API + "/todo/complete/" + id, {method : "PATCH"})
      .then(res => res.json());
    setTodos(updatedTodos);

  };

  const deleteTodo = async id => {
    const updatedTodos = await fetch(API + "/todo/delete/" + id, {method : "DELETE"})
      .then(res => res.json());
    setTodos(updatedTodos)
  };

  const addTodo = async () => {
    if (newTodo === "") {return}
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

  const updateTodo = async () => {
    const updatedTodos = await fetch(API + "/todo/edit/" + editId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: editedTodo
      })
    }).then(res => res.json())
    setTodos(updatedTodos)
    setEditId(-1)
    setEditedTodo("")
  };

  const handleEnterKey = (fn ,event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fn();
    }
  };
  
  const handleClickOnTask = (id, task, event) => {
    setEditId(id);
    setEditedTodo(task);
  };

  return (
    <div className="App">
        <h1>Welcome</h1>
        <h3>Todos</h3>
        
        <div className="addTask">
          <input className="addNewTodo" input="text" placeholder="+ Add New Task" onKeyDown={e => handleEnterKey(addTodo, e)} onChange={e => setNewTodo(e.target.value)} value={newTodo}></input>
        </div>

        <div className="todos">
          {todos.length > 0 ? todos.map(todo => (
            <div className={"todo " + (todo.completed ? "completed" : "")} key = {todo.id}> 
              <div className="checkbox-area" onClick = {() => toggleComplete(todo.id)}> 
                <div className="checkbox" ></div>
              </div>

              {
                editId === todo.id ? (
                  <div contentEditable="true" autoFocus suppressContentEditableWarning={true}  className="editTodo" input="text" placeholder={todo.task} onKeyDown={e => handleEnterKey(updateTodo, e)} onInput={e => setEditedTodo(e.currentTarget.textContent)} onBlur={e => updateTodo()}value={editedTodo}>{todo.task}</div>
                 ) : (
                  <div className="taskDetails" onClick={e => handleClickOnTask(todo.id, todo.task, e)}>{ todo.task }</div>
                 )
              }
              <div className="deleteTask" onClick={() => deleteTodo(todo.id)}><img src={icon} alt="trash icon"></img></div>
            </div>
          )) : "You Have No Tasks!"}
          
        </div>
        <Footer />
    </div>
  );
}

export default App;
