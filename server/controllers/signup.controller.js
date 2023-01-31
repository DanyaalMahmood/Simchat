const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//key used for generating jwt tokens
const secret = 'SecretPassword';

const signup = async (req, res) => {
  try {
    //destructuring the attributes of the user from the request body
    const { name, number, email, password } = req.body;

    //querying the data base for users on basis of the recieved number
    const users = await prisma.users.findMany({
      where: {
        number: number,
      },
    });

    //if number already exists in the database raise an error
    if (users.length > 0) {
      return res.status(400).json({ error: 'Number is already in use!' });
    }

    //create a hash for the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.users.create({
      data: {
        name: name,
        email: email,
        number: number,
        password: hashedPassword,
      },
    });

    //retrieve user that has just been saved
    const user = await prisma.users.findFirstOrThrow({
      where: {
        number: number,
      },
    });

    //creating json web token to send back with the request
    const tokenbody = { name: user.name, number: user.number, id: user.id };
    const token = await jwt.sign(tokenbody, secret, {
      expiresIn: 3 * 24 * 60 * 60,
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'User has been created successfully.' });
  } catch (err) {
    res.status(400).json({ error: 'An error occured while signing up!' });
  }
};

module.exports = signup;
