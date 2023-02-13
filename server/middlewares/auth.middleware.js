const jwt = require('jsonwebtoken');

// check current user
const checkUser = async(req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({"error": "Not a valid json token"});
      } else {
        next(); 
      }
    });
  } else {
    res.json({"error": "You are not Logged In!"});
  }
};


module.exports = checkUser