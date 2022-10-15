
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const api = require('./api');

app.use('/api', api);

app.get('/', (req, res) => {
    res.status(200).send(
        "Hello"
    )
});

app.get('/todo', (req, res) => {
    res.status(200).send({
        1:'task 1',
        2:'task 2',
        3:'task 31'
    })
});

app.get('/todo/:id', (req, res) => {
    res.status(200).send(req.params.id)
});

app.listen(
    PORT,
    () => console.log(`its alive on http://localhost:${PORT}`)
);