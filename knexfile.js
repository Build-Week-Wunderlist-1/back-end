// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    // useNullAsDefault: true,
    connection: {
      // filename: './database/auth.db3',
      host: '127.0.0.1',
      user: 'postgres',
      password: 'x',
      database: 'wunderlist',
    },
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run('PRAGMA foreign_keys = ON', done);
    //   },
    // },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
