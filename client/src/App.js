function App() {
  return (
    <div className="App">
        <h1>Hello</h1>
        <h3>Todos</h3>

        <div className="todos">

          <div className="todo"> 
            <div className="checkbox">check</div>
            <div className="taskDetails">test</div>
            <div className="deleteTask">del</div>
          </div>

          <div className="todo"> 
            <div className="checkbox">check</div>
            <div className="taskDetails">apple</div>
            <div className="deleteTask">del</div>
          </div>

          <div className="todo"> 
            <div className="checkbox">check</div>
            <div className="taskDetails">banana</div>
            <div className="deleteTask">del</div>
          </div>

        </div>
    </div>
  );
}

export default App;
