// ./config/server.ts
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),  // Dirección IP donde Strapi escuchará
  port: env.int('PORT', 1337),   // Puerto en el que Strapi se ejecuta
  app: {
    keys: env.array('APP_KEYS'),  // Claves de la aplicación
  },
});
