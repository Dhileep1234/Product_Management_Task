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