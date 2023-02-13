# Simchat
Chat application that uses Node and Socket.io to enable real time communication between two users. The authentication system is based on jwt tokes stored inside of cookies. The front end is constructed using ReactJS.

View the [live webapp here](http://www.danyaalmahmood.com/simchat).


https://user-images.githubusercontent.com/110989303/218523421-778de817-f226-436e-9c23-e78507027a1c.mp4


## Key Features

* Authentication using Json Web Tokens stored inside of cookies.
* Users can friend each using their numbers.
* Users can communicate with each other in real time. (Based on websockets using socket.io library)
* Chat scrolls down to bottom when a new message is recieved.(Using javascript)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line run the following commands:

```bash
# Clone this repository
$ git clone https://github.com/danyaalmahmood/Simchat

# Go into the repository and open the server folder
$ cd Simchat/server

# Install dependencies
$ npm install

# Run the app
$ npm start
```

> **Note**
> If you are serving the front end from a different domain add the backend domain in the socket initialization inside of src/components/Messages.js file.
```javascript
const socket = io("https://localhost:4000");
```


## Tech Stack

* React
* Redux
* Tailwind
* Node
* Express
* Postgres
* Prisma
* Socket.io
