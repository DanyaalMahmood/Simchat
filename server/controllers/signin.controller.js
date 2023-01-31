const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//key used for generating jwt tokens
const secret = 'SecretPassword';

const signin = async (req, res) => {
  try {
    //destructuring the attributes of the user from the request body
    const {number, password } = req.body;

    //querying the data base for users on basis of the recieved number
    const users = await prisma.users.findMany({
      where: {
        number: number,
      },
    });
    //check to see if the a user even exists with the same number in the database
    if (users.length === 0) {
      return res.status(400).json({ error: 'No user with this number exists!'});
    }

    //retrieve user that has the same number
    const user = await prisma.users.findFirstOrThrow({
      where: {
        number: number,
      },
    });

    const checkPassword = await bcrypt.compare(password, user.password);

    if(checkPassword === false)
    {
      return res.status(400).json({ error: 'Incorrect Password'});
    }

    //creating json web token to send back with the request
    const tokenbody = { name: user.name, number: user.number, id: user.id };
    const token = await jwt.sign(tokenbody, secret, {
      expiresIn: 3 * 24 * 60 * 60,
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'User has been signed in successfully.'});
  } catch (err) {
    res.status(400).json({ error: 'An error occured while signing in!' });
  }
};

module.exports = signin;
