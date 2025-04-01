export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors', 
    config: {
      enabled: true,
      headers: '*',
      origin: ['*'], // Permite cualquier origen (para desarrollo)
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
