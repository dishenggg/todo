
const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid')
const PORT = process.env.PORT || 8080;
const app = express();
//const cors = require('cors');

const todos = [
    {
        id: 1,
        task: "Do A",
        completed: false
    },
    {
        id: 2,
        task: "Do B",
        completed: true
    },
    {
        id: 3,
        task: "Do C",
        completed: false
    }
];

app.use(express.json());
//app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/', (req, res) => {
    res.status(200).send(
        "Welcome"
    )
});
// Get all tasks
app.get('/todo', (req, res) => {
    res.status(200).json(todos);
});
// Get task with id
app.get('/todo/:id', (req, res) => {
    let task = todos.find(x => x.id == req.params.id);
    console.log(task)
    if (typeof task !== 'undefined') {
        res.status(200).send(task);
    } else {
        res.status(404).send("404 Not Found");
    }
});
// Adds new task to list
app.post('/todo/new', (req, res) => {
    const newTodo = {
        id: uuidv4(),
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.json(todos);
    res.status(201);

});
// Delete tasks from list
app.delete('/todo/delete/:id', (req, res) => {
    let taskToDel = todos.find(x => x.id == req.params.id);
    if (typeof taskToDel !== 'undefined') {
        let index = todos.indexOf(taskToDel);
        todos.splice(index, 1)
        res.json(todos);
        res.status(200)
    } else {
        res.status(404).send("404 Not Found");
    }
});

// Toggle Complete
app.put('/todo/complete/:id', (req, res) => {
    let task = todos.find(x => x.id == req.params.id);
    if (typeof task !== 'undefined') {
        let index = todos.indexOf(task);
        todos[index].completed = !todos[index].completed
        res.json(todos);
        res.status(200)
    } else {
        res.status(404).send("404 Not Found");
    }
});

app.listen(
    PORT,
    () => console.log(`its alive on http://localhost:${PORT}`)
);