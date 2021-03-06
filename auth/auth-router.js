const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.js');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      console.log(saved);
      res.status(201).json({ data: saved });
    })
    .catch((error) => {
      console.log('Register error', error);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce a token
        console.log('User = ', user);
        const token = generateToken(user);
        // send the token to the client
        res.status(200).json({
          message: `Welcome ${user.username}, you got a token`,
          userId: user.id,
          token,
        });
      } else {
        res.status(401).json({
          message: 'Invalid Credentials, you have a messed up password',
        });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: 'Server troubles, contact backend' });
    });
});

function generateToken(user) {
  // the data
  const payload = {
    userId: user.id,
    username: user.username,
    useremail: user.email,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '14d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
