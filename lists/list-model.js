const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  addTask,
  addTaskToUser,
  updateTask,
  deleteTask,
};

function find() {
  return db('user_todo')
    .select(
      'user_todo.id as user_todo_id',
      'users.username',
      'users.id as user_id',
      'todo.taskName',
      'todo.taskDescription',
      'todo.date',
      'todo.completed'
    )
    .join('todo', 'user_todo.listId', '=', 'todo.id')
    .join('users', 'user_todo.userId', '=', 'users.id');
}

function findBy(filter) {
  // return db('user_todo').where(filter);
  return db('user_todo')
    .select(
      'user_todo.id as user_todo_id',
      'users.username',
      'users.id as user_id',
      'todo.taskName',
      'todo.taskDescription',
      'todo.date',
      'todo.completed',
      'todo.id'
    )
    .join('todo', 'user_todo.listId', '=', 'todo.id')
    .join('users', 'user_todo.userId', '=', 'users.id')
    .where(filter);
}

function findById(id) {
  return db('todo').where({ id }).first();
}

async function addTask(task) {
  const [id] = await db('todo').insert(task);

  return findById(id);
}

function addTaskToUser(id1, id2) {
  return db('user_todo').insert({ userId: id1, listId: id2 });
}

async function updateTask(task, id) {
  await db('todo').update(task).where({ id });
  return findById(id);
}

function deleteTask(id) {
  return db('todo').where({ id }).del();
}
