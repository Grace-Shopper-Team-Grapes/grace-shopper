const User = require('../db/models/User');

const isAdmin = (req, res, next) => {
  req.user.id && req.user.isAdmin ? next() : res.sendStatus(403);
};

const isLoggedIn = (req, res, next) => {
  req.params.id === req.user.id ? next() : res.sendStatus(403);
};

const isSignedUp = async (req, res, next) => {
  const findEmail = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (findEmail) {
    res.status(401).send('User already exists');
  } else {
    next();
  }
};

module.exports = {
  isAdmin,
  isLoggedIn,
  isSignedUp
};
