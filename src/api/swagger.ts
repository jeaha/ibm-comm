import * as express from 'express';
import swaggerJSDoc = require('swagger-jsdoc');
import swaggerUi = require('swagger-ui-express') // For api UI page

const options = {
  swaggerDefinition: {
    info: {
      title: 'Headlines Recommendation',
      version: '1.0.0',
      description: 'REST APIs for the simple recommendation system to match relevant news headlines to internal employees',
      contact: {
        email: 'jeaha@us.ibm.com'
      }
    },
    schemes: ['http'],
    host: 'localhost:5000',
    basePath: '/'
  },
  apis: ["**/*.ts"]
}

const swaggerSpec = swaggerJSDoc(options);
export const swaggerRouter = express.Router();

require('swagger-model-validator')(swaggerSpec)

swaggerRouter.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export function validateModel (name: any, model: any) {
  const responseValidation = swaggerSpec.validateModel(name, model, false, true)
  if (!responseValidation.valid) {
    console.error(responseValidation.errors)
    throw new Error(`Model doesn't match Swagger contract`)
  }
}
