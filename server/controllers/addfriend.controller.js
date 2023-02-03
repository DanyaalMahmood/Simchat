const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const addfriend = async (req, res) => {

  console.log(req.body);
  const {user, friend} = req.body;

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

  // const User = await prisma.users.findFirst({
  //   where: {
  //     number: user
  //   },
  //   include: {
  //     friends: true,
  //     friendof: true
  //   },
  // });

  console.log(User, "friend added");


  res.json({message: "Friend has been added!"});
};

module.exports = addfriend;
