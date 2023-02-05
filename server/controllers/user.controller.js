const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const user = async (req, res) => {
  try {

    const token = req.cookies.jwt;
    const decode = jwt.decode(token);
    const number = decode.number;

    //querying the data base for users on basis of the recieved number
    const user = await prisma.users.findFirst({
      where: {
        number: number,
      },
    });
   
    const response = {
      name: user.name,
      email: user.email,
      number: user.number
    }

    res.json(response);
  } catch (err) {
    res.status(400).json({ error: 'An error occured while signing in!' });
  }
};

module.exports = user;
