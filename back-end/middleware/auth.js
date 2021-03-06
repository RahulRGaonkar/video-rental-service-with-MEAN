const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send('Acess Denied');

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = verifiedToken;
    next();

  } catch (err) {
    res.status(400).status('Token invalid');
  }
}