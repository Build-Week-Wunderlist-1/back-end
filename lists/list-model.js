const db = require('../database/dbConfig.js');

module.exports = {
  add,
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
      'todo.creationDate',
      'todo.completed'
    )
    .join('todo', 'user_todo.listId', '=', 'todo.id')
    .join('users', 'user_todo.userId', '=', 'users.id');
}

function findBy(filter) {
  return db('user_todo')
    .select(
      'user_todo.id as user_todo_id',
      'users.username',
      'users.id as user_id',
      'todo.taskName',
      'todo.taskDescription',
      'todo.date',
      'todo.creationDate',
      'todo.completed'
    )
    .join('todo', 'user_todo.listId', '=', 'todo.id')
    .join('users', 'user_todo.userId', '=', 'users.id')
    .where(filter);
}

async function add(user) {
  const [id] = await db('user_todo').insert(user);

  return findById(id);
}

function findById(id) {
  return db('todo').where({ id }).first();
}

function addTask(task) {
  return db('todo').insert(task).returning('*');
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
