const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '',      // by default: '1.0.0'
    title: '',        // by default: 'REST API'
    description: '',  // by default: ''

  },
  host: "localhost:4000",
  basePath: '',  // by default: '/'
  schemes: [],   // by default: ['http']
  consumes: [],  // by default: ['application/json']
  produces: [],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: '',         // Tag name
      description: '',  // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {
      bearerAuth: {
          type: 'apiKey',
          scheme: 'bearer',
          bearerFormat: 'JWT'
      }
  },  // by default: empty object
  definitions: {},          // by default: empty object (Swagger 2.0)
  components: {}            // by default: empty object (OpenAPI 3.x)
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../index.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);