const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const getfriends = async (req, res) => {

  const { number } = req.params;
  try {
  const User = await prisma.users.findFirst({
    where: {
      number: number
    },
    select: {
      friends: {
        select: {
          name: true,
          number: true
        }
      },
      friendof: {
        select: {
          name: true, 
          number: true,
        }
      }
    },
  });
  const a = User.friends;
  const b = User.friendof;
  const friend = a.concat(b);
  res.json(friend);
  } catch (err) 
  {
    console.log(err.message);
  } 
};

module.exports = getfriends;
