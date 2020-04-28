exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        username: 'Ernest Hemingway',
        email: 'Quiggly@abc.com',
        password: 'Old Man and Sea',
      },
      {
        id: 2,
        username: 'Mark Twain',
        email: 'Adventures@abc.com',
        password: 'Huck',
      },
      {
        id: 3,
        username: 'George Eliot',
        email: 'G-dog@abc.com',
        password: 'Middlemarch',
      },
    ]);
  });
};
