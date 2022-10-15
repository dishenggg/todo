const express = require('express');

const router = express.Router();
const tasks = require('./tasks');

router.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    })
})

router.use('/tasks', tasks);

module.exports = router;