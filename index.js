
const express = require('express');
const {v4: uuidv4} = require('uuid')
const PORT = process.env.PORT || 8080;
const app = express();
const api = require('./api');

const todos = [
    {
        id: 1,
        task: "Do A",
        completed: false
    },
    {
        id: 2,
        task: "Do B",
        completed: false
    }
];

app.use('/api', api);
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(
        "Welcome"
    )
});

app.get('/todo', (req, res) => {
    res.status(200).json(todos);
});

app.get('/todo/:id', (req, res) => {
    let task = todos.find(x => x.id == req.params.id);
    console.log(task)
    if (typeof task !== 'undefined') {
        res.status(200).send(task);
    } else {
        res.status(404).send("404 Not Found");
    }
});

app.post('/todo/new', (req, res) => {
    const newTodo = {
        id: uuidv4(),
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(todos);

});

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