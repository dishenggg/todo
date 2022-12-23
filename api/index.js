
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
const todo = require('./todo')

// Cors Whitelist
const whitelist = ['http://localhost:3000', "https://todo-41e.pages.dev/", "https://yeodisheng.com/", "https://todo-five-phi.vercel.app/"]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

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
