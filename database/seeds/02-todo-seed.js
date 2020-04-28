exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todo').then(function () {
    // Inserts seed entries
    return knex('todo').insert([
      {
        id: 1,
        taskName: 'WW1',
        taskDescription: 'Win WW1 on Italian front',
        sortField: 1,
        completed: false,
      },
      {
        id: 2,
        taskName: 'Adventures on the Mississippi',
        taskDescription: 'Travel down a big river',
        sortField: 2,
        completed: false,
      },
      {
        id: 3,
        taskName: 'Spend Fortune',
        taskDescription: 'Spend that money',
        sortField: 3,
        completed: false,
      },
    ]);
  });
};
