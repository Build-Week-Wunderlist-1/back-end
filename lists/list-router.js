const router = require('express').Router();
const authentication = require('../auth/authenticator.js');

const Lists = require('./list-model.js');
// const Users = require('./user-model.js');

router.get('/', (req, res) => {

  Lists.find()
    .then(lists => {
      res.json(lists);
    })
    .catch(err => res.json(err));
});

router.get('/:id', authentication, (req, res) => {

  // find the user by id, then do another findByFilter and use the user id as  the filter. 
  const id = req.params.id;
  Lists.findBy({userId: id})
    .then(lists => {
      res.json(lists);
    })
    .catch(err => res.json(err));
});

module.exports = router;

