const express = require('express');
const cors = require('cors');

const signup = require('../server/controllers/signup.controller');
const signin = require('../server/controllers/signin.controller');

const addfriend = require('../server/controllers/addfriend.controller');
const getfriends = require('./controllers/getfriends.controller');

const app = express();
const port = 4000;

const options = {origin: true, credentials: true};
app.use(cors(options));
app.use(express.json());



app.post('/signup', signup);
app.post('/signin', signin);

app.post('/friends', addfriend);
app.get('/friends/:number', getfriends);



app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});