import { useState, useEffect } from "react";
import icon from './img/recycle-bin-line-icon.svg';
import Footer from './footer';

const API = process.env.REACT_APP_API

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(-1);
  const [editedTodo, setEditedTodo] = useState("");

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
    fetch(API + "/todo/complete/" + id, {method : "PATCH"})
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  };

  const deleteTodo = async id => {
    fetch(API + "/todo/delete/" + id, {method : "DELETE"})
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  };

  const addTodo = async () => {
    if (newTodo === "") {return}
    fetch(API + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: newTodo
      })
    }).then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
    setNewTodo("");    
  };

  const updateTodo = async () => {
    fetch(API + "/todo/edit/" + editId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: editedTodo
      })
    }).then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
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
    setTimeout( () => {
      event.target.focus();
    }, 0)
  };

  return (
    <div className="App">
        <h1>📝 Todo List</h1>
        <h3>Todos {API} ({todos.length})</h3>
        
        <div className="addTask">
          <input className="addNewTodo" input="text" placeholder="+ Add New Task" onKeyDown={e => handleEnterKey(addTodo, e)} onChange={e => setNewTodo(e.target.value)} value={newTodo}></input>
        </div>

        <div className="todos">
          {todos.length > 0 ? todos.map(todo => (
            <div className={"todo " + (todo.completed ? "completed " : "") + (editId === todo._id ? "editing" : "")} key = {todo._id}> 
              <div className="checkbox-area" onClick = {() => toggleComplete(todo._id)}> 
                <div className="checkbox" ></div>
              </div>

              {
                editId === todo._id ? (
                  <div contentEditable="true" tabIndex="0" suppressContentEditableWarning={true}  className="editTodo" input="text" placeholder={todo.task} onKeyDown={e => handleEnterKey(updateTodo, e)} onInput={e => setEditedTodo(e.currentTarget.textContent)} onBlur={e => updateTodo()}value={editedTodo}>{todo.task}</div>
                 ) : (
                  <div className="taskDetails" onClick={e => handleClickOnTask(todo._id, todo.task, e)}>{ todo.task }</div>
                 )
              }
              <div className="deleteTask" onClick={() => deleteTodo(todo._id)}><img src={icon} alt="trash icon"></img></div>
            </div>
          )) : "You Have No Tasks!"}
          
        </div>
        <Footer />
    </div>
  );
}

export default App;
