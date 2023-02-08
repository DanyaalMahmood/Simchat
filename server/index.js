const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require("cookie-parser");
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signup = require('../server/controllers/signup.controller');
const signin = require('../server/controllers/signin.controller');
const signout = require('./controllers/signout.controller')
const user = require('./controllers/user.controller');

const addfriend = require('../server/controllers/addfriend.controller');
const getfriends = require('./controllers/getfriends.controller');

const checkUser = require('./middlewares/auth.middleware')

const app = express();
const port = process.env.port;

const options = { origin: true, credentials: true };
app.use(cors(options));
app.use(express.json());
app.use(cookieParser());

app.post('/signup', signup);
app.post('/signin', signin);
app.get('/signout', signout);

app.post('/friends', addfriend);
app.get('/friends/:number', getfriends);
app.get('/user', checkUser, user);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', async (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('get_messages', async (data) => {

    const { from, to } = data;
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                sentbyuser: {
                  is: {
                    number: from
                  }
                }
              },
              {
                senttouser: {
                  is: {
                    number: to
                  }
                }
              }
            ]
          },
          {
            AND: [
              {
                sentbyuser: {
                  is: {
                    number: to
                  }
                }
              },
              {
                senttouser: {
                  is: {
                    number: from
                  }
                }
              }
            ]
          }
        ]
      }  
    });

    socket.join(from);
    socket.emit('update_chat', messages);
    console.log('get_messages recieved event from client side');
  });

  socket.on('send_message', async (data) => {
    const mess = await prisma.messages.create({
      data: {
        message: data.message,
        sentbyuser: {
          connect: {
            number: data.from,
          },
        },
        senttouser: {
          connect: {
            number: data.to,
          },
        },
      },
      include: {
        sentbyuser: true,
        senttouser: true,
      },
    });

    const {from, to} = data;

    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                sentbyuser: {
                  is: {
                    number: from
                  }
                }
              },
              {
                senttouser: {
                  is: {
                    number: to
                  }
                }
              }
            ]
          },
          {
            AND: [
              {
                sentbyuser: {
                  is: {
                    number: to
                  }
                }
              },
              {
                senttouser: {
                  is: {
                    number: from
                  }
                }
              }
            ]
          }
        ]
      }  
    });

    //socket.join(from);
    socket.emit('update_chat', messages);
    io.to(to).emit('update_chat', messages);

    console.log(mess);
    socket.emit('recieve_message', { message: 'message has been delivered' });
  });
});

server.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
