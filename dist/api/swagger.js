"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express"); // For api UI page
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
};
const swaggerSpec = swaggerJSDoc(options);
exports.swaggerRouter = express.Router();
require('swagger-model-validator')(swaggerSpec);
exports.swaggerRouter.get('/json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
exports.swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
function validateModel(name, model) {
    const responseValidation = swaggerSpec.validateModel(name, model, false, true);
    if (!responseValidation.valid) {
        console.error(responseValidation.errors);
        throw new Error(`Model doesn't match Swagger contract`);
    }
}
exports.validateModel = validateModel;
