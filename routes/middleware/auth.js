const users = require('../data/users.json');

// Simulated login token decoding
function getUserRole(req) {
  const token = req.headers['authorization'];
  const user = users.find(u => u.token === token);
  return user?.role;
}

module.exports = {
  verifyTeacher: (req, res, next) => {
    const role = getUserRole(req);
    if (role === 'teacher') return next();
    res.status(403).json({ message: 'Forbidden: Teachers only' });
  }
};
