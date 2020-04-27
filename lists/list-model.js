const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  editList,
};

function find() {
    return db('user_todo')
    .select( "user_todo.id as user_todo_id", 'users.username', 'users.id as user_id', 'todo.taskName', 'todo.taskDescription', 'todo.date', 'todo.completed')
    .join('todo', 'user_todo.listId', '=', 'todo.id')
    .join('users', 'user_todo.userId', '=', 'users.id');
}

function findBy(filter) {
  // return db('user_todo').where(filter);
  return db('user_todo')
    .select( "user_todo.id as user_todo_id", 'users.username', 'users.id as user_id', 'todo.taskName', 'todo.taskDescription', 'todo.date', 'todo.completed')
    .join('todo', 'user_todo.listId', '=', 'todo.id')
    .join('users', 'user_todo.userId', '=', 'users.id')
    .where(filter);
}

async function add(user) {
  const [id] = await db('user_todo').insert(user);

  return findById(id);
}

function findById(id) {
  return db('user_todo')
    .where({ id })
    .first();
}

function editList () {
}



// function getTasks(id) {
//   return db('tasks')
//     .select(
//       'tasks.id',
//       'tasks.description as task_description',
//       'tasks.notes as task_notes',
//       'tasks.completed',
//       'projects.project_name',
//       'projects.description as project_description'
//     )
//     .join('projects', 'tasks.project_id', '=', 'projects.id')
//     .where({ project_id: id });
// }


// knex ex

// knex('users')
//   .join('contacts', 'users.id', '=', 'contacts.user_id')
//   .select('users.id', 'contacts.phone')
// Outputs:
// select "users"."id", "contacts"."phone" from "users" inner join "contacts" on "users"."id" = "contacts"."user_id"