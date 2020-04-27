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

router.get('/:id', (req, res) => {

  // How to authenticate userId?
  // try asking the front-end to send a userId with the get request if they want access to a list. 
  const paramsId = req.params.id;
  const bodyId = req.body.userId;

  if (paramsId === bodyId) {
    // respond with the list filtered by {userId: bodyId}
  } else {
    // respond with "Access denied"
  }
  Lists.findBy({userId: paramsId})
    .then(lists => {
      res.json(lists);
    })
    .catch(err => res.json(err));
});


module.exports = router;

