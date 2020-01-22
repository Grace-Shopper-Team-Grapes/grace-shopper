const User = require('../db/models/User');

const isLoggedIn = (req, res, next) => {
  req.user.id ? next() : res.sendStatus(401);
};

const isAdmin = (req, res, next) => {
  req.user.isAdmin ? next() : res.sendStatus(401);
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
