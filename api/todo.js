const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();


// MongoDB
const URI = process.env.MONGO_DB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) .then(() => console.log("connected to DB"))
   .catch(e => console.error(e));

const Todo = require('./models/Todo');

// Get all tasks

router.get('/', async (req,res) => {
    const todos = await Todo.find();
    res.json(todos);
    res.status(200);
  });

// Get task with id TODO
router.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
    res.status(200);
})

// Adds new task to list
router.post('/new', async (req, res) => {
    const newTodo = new Todo({
        task: req.body.task
    })
    newTodo.save();
    res.json(await Todo.find());
    res.status(201);
})

// Delete tasks from list
router.delete('/delete/:id', async (req, res) => {
    const updatedTodos = await Todo.findByIdAndDelete(req.params.id);
    res.json(await Todo.find());
});

// Toggle Complete
router.patch('/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(await Todo.find());
});

//Edits tasks
router.patch('/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.task = req.body.task
    await todo.save();
    res.json(await Todo.find());
})

module.exports = router;