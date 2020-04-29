exports.up = function (knex) {
  return knex.schema
    .createTable('users', (users) => {
      users.increments();

      users.string('username', 128).notNullable().unique();
      users.string('email', 255).notNullable().unique();
      users.string('password', 128).notNullable();
    })
    .createTable('todo', (task) => {
      task.increments();
      task.string('taskName').notNullable();
      task.string('taskDescription').notNullable();
      task.integer('sortField').defaultTo(1);
      task.timestamp('creationDate').defaultTo(knex.fn.now());
      task.timestamp('modifiedDate').defaultTo(knex.fn.now());
      task.boolean('completed').defaultTo(false);
    })
    .createTable('user_todo', (el) => {
      el.increments();
      el.integer('userId')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      el.integer('listId')
        .notNullable()
        .references('id')
        .inTable('todo')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('user_todo')
    .dropTableIfExists('todo')
    .dropTableIfExists('users');
};
