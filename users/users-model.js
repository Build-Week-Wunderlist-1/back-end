const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
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
