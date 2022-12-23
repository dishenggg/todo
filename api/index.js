
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
const todo = require('./todo.js')

// Cors
const whitelist = ['http://localhost:3000', "https://todo-41e.pages.dev/", "https://yeodisheng.com/"]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cors());

// Todo API
app.use('/todo', todo)
app.get('/', (req, res) => {
    res.status(200).send(
        "Welcome"
    )
});

app.listen(
    PORT,
    () => console.log(`its alive on PORT: ${PORT}`)
);
