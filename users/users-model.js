const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateUser,
};

function find() {
  return db('users').select('id', 'username', 'email', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

function add(user) {
  return db('users').insert(user).returning('*');
}

function findById(id) {
  return db('users').where({ id }).first();
}

async function updateUser(updates, id) {
  await db('users').update(updates).where({ id });
  return findById(id);
}
