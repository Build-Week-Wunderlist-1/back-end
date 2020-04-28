const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.json(err));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const hash = bcrypt.hashSync(updates.password, 10);
  updates.password = hash;

  Users.updateUser(updates, id)
    .then((response) => {
      res.status(200).json({ message: response });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
