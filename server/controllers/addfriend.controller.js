const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const addfriend = async (req, res) => {

  console.log(req.body);
  const {user, friend} = req.body;

  try {

  const User = await prisma.users.update({
    where: {
      number: user
    },
    data: {
      friends: {
        connect: {
          number: friend
        }
      }
    },
    include: {
      friends: true,

    },
  });

  console.log(User, "friend added");
  } catch (err) {
    return res.json({error: "This number does not exist."});
  }

  


  res.json({message: "Friend has been added!"});
};

module.exports = addfriend;
