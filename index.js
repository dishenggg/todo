
const express = require('express');
const {v4: uuidv4} = require('uuid')
const PORT = process.env.PORT || 8080;
const app = express();
const api = require('./api');

const todos = [
    {
        id: 1,
        task: "Do A"
    },
    {
        id: 2,
        task: "Do B"
    }
]

app.use('/api', api);
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(
        "Hello"
    )
});

app.get('/todo', (req, res) => {
    res.status(200).json(todos)
});

app.get('/todo/:id', (req, res) => {
    res.status(200).send(req.params.id)
});

app.post('/', (req, res) => {
    const newTodo = {
        id: uuidv4(),
        task: req.body.task
    }
    todos.push(newTodo)
    res.status(201).json(todos);

})

app.listen(
    PORT,
    () => console.log(`its alive on http://localhost:${PORT}`)
);