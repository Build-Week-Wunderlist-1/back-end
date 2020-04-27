
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_todo').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_todo').insert([
        {id: 1, userId: 1, listId: 1},
        {id: 2, userId: 2, listId: 2},
        {id: 3, userId: 2, listId: 3},
      ]);
    });
};
