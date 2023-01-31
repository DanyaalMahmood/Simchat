const express = require('express');
const cors = require('cors');

const signup = require('../server/controllers/signup.controller');
const signin = require('../server/controllers/signin.controller');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());



app.post('/signup', signup);
app.post('/signin', signin);



app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});