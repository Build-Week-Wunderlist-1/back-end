const router = require('express').Router();
const authentication = require('../auth/authenticator.js');

const Lists = require('./list-model.js');
const Users = require('../users/users-model');

router.get('/', (req, res) => {
  Lists.find()
    .then((lists) => {
      res.json(lists);
    })
    .catch((err) => res.json(err));
});

router.get('/:id', authentication, (req, res) => {
  // How to authenticate userId?
  // try asking the front-end to send a userId with the get request if they want access to a list.
  const paramsId = req.params.id;
  const bodyId = req.body.userId;

  if (paramsId === bodyId) {
    // respond with the list filtered by {userId: bodyId}
  } else {
    // respond with "Access denied"
  }

  Lists.findBy({ userId: paramsId })
    .then((lists) => {
      res.json(lists);
    })
    .catch((err) => res.json(err));
});

router.post('/:id', (req, res) => {
  Lists.addTask(req.body)
    .then((task) => {
      const userId = req.params.id;
      const listId = task.id;

      Lists.addTaskToUser(userId, listId)
        .then(() => {
          res.status(201).json({ data: task });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/:id/:todoId', (req, res) => {
  const id = req.params.todoId;
  const task = req.body;

  Lists.updateTask(task, id)
    .then((response) => {
      // returns the updated task in the message
      res.status(200).json({ message: response });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id/:todoId', (req, res) => {
  const id = req.params.todoId;

  Lists.deleteTask(id)
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted the task.' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
