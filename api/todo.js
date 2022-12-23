const express = require('express');
const {v4: uuidv4} = require('uuid')
const router = express.Router();

const todos = [
    {
        id: 1,
        task: "Hello! Welcome to my todo app",
        completed: false
    },
    {
        id: 2,
        task: "These are dummy todos and features that I am still working on",
        completed: false
    },
    {
        id: 3,
        task: "Todo:",
        completed: false
    },
    {
        id: 4,
        task: "Allow edits to tasks",
        completed: true
    },
    {
        id: 8,
        task: "Allow 1 click to edit instead of 2",
        completed: false
    },
    {
        id: 5,
        task: "Sort tasks by recency and completion",
        completed: false
    },
    {
        id: 6,
        task: "Add filter to show all/completed/todos",
        completed: false
    },
    {
        id: 7,
        task: "Add database to preserve tasks",
        completed: false
    }
];

// Get all tasks
router.get('/', (req, res) => {
    res.status(200).json(todos);
});

// Get task with id
router.get('/:id', (req, res) => {
    let task = todos.find(x => x.id == req.params.id);
    if (typeof task !== 'undefined') {
        res.status(200).send(task);
    } else {
        res.status(404).send("404 Not Found");
    }
});

// Adds new task to list
router.post('/new', (req, res) => {
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
router.delete('/delete/:id', (req, res) => {
    let taskToDel = todos.find(x => x.id == req.params.id);
    if (typeof taskToDel !== 'undefined') {
        let index = todos.indexOf(taskToDel);
        todos.splice(index, 1)
        res.json(todos);
    } else {
        res.status(404).send("404 Not Found");
    }
});

// Toggle Complete
router.patch('/complete/:id', (req, res) => {
    let task = todos.find(x => x.id == req.params.id);
    if (typeof task !== 'undefined') {
        let index = todos.indexOf(task);
        todos[index].completed = !todos[index].completed
        res.json(todos);
    } else {
        res.status(404).send("404 Not Found");
    }
});

//Edits tasks
router.patch('/edit/:id', (req, res) => {
    let task = todos.find(x => x.id == req.params.id);
    if (typeof task !== 'undefined') {
        let index = todos.indexOf(task);
        todos[index].task = req.body.task;
        res.json(todos);
    } else {
        res.status(404).send("404 Not Found")
    }
})

module.exports = router;