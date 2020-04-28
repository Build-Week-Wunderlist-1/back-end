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

  const paramsId = req.params.id;

  Lists.findBy({userId: paramsId})
    .then(lists => {
      res.json(lists);
    })
    .catch(err => res.json(err));
});

router.post('/:id', (req, res) => {
  console.log("post req.body = ", req.body);
  Lists.addTask(req.body)
    .then((task) => {
      const userId = req.params.id;
      const listId = task.id;

      Lists.addTaskToUser(userId, listId)
        .then(() => {
          res.status(201).json({ data: task });
        })
        .catch((err) => {
          res.status(500).json({ error: "Can't add task to user_todo table"});
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "Can't add the task to the todo table" });
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


module.exports = router;

