// const jwt = require('jsonwebtoken');

// // Replace this value with your JWT secret key
// const JWT_SECRET = '470ff8c244542723a8b69f4851a1d1b990ab904a16bdfd90f4134bb057e21eba';

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.sendStatus(401);

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, JWT_SECRET, (err, user) => {
// //   jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     // if (err) return (err);
//     console.log(err);
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

const JWT_SECRET="Jwt";

function authenticateToken(req, res, next) {
    // Extract token from Authorization header
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
      return res.status(403).json({ message: 'Token required' });
    }
  
    // Verify the token with the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      req.user = user; // Attach the decoded user to the request object
      next(); // Continue to the protected route
    });
  }
  
module.exports = authenticateToken;