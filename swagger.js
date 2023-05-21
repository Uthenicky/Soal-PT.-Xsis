const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  swaggerDefinition: {
    info: {
      title: 'Soal PT. XSIS - NodeJs',
      version: '1.0.0',
      description: 'API documentation using Swagger and ExpressJs framework',
      contact: {
        email: 'utheniky@gmail.com'
      }
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{ bearerAuth: [] }],
  apis: ['routes/*.js'],
}

const swaggerSpec = swaggerJsDoc(options)

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

