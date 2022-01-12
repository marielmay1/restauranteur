module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: env('DATABASE_CONNECTOR', 'mongo'),
      settings: {
        client: env('DATABASE_CLIENT', 'mongo'),
        host: env('DATABASE_HOST', 'mongo'),
        srv: env.bool('DATABASE_SRV', false),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        }
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),

        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});
