"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DaoSingleton_1 = require("../daos/DaoSingleton");
const swagger_1 = require("./swagger");
// To access employee data manager
const edao = DaoSingleton_1.default.getEmployeeDAOInstance('memory');
// employee controller: context root and router
class EmployeeController {
    constructor() {
        this.path = '/employees';
        this.router = express.Router();
        this.init();
    }
    // Take each handler, and attach to one of the Express.Router's endpoints.
    init() {
        this.router.get('/', this.getAllEmployee);
        this.router.get('/subscription/:subscriptionType', this.getEmpBySubscription);
        this.router.post('/', this.postEmpRequest);
    }
    /**
     * @swagger
     * /employees:
     *   get:
     *     description: Retrieve the full list of employees
     *     tags:
     *       - employees
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: employees
     *         schema:
     *           $ref: '#/definitions/Employees'
    */
    getAllEmployee(request, response, next) {
        const data = edao.retrieveAll(); // call data access layer
        // validateModel('Employees', response)
        response.send(data);
    }
    /**
     * @swagger
     * /employees/subscription/{subscriptionType}:
     *   get:
     *     description: Retrieve a list of employees subscribing the specified subscription type
     *     tags:
     *       - employees
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: subscriptionType
     *         description: Specify subsciption type
     *         in: path
     *         required: true
     *     responses:
     *       200:
     *         description: subscribed employees
     *         schema:
     *           $ref: '#/definitions/Employees'
    */
    getEmpBySubscription(request, response, next) {
        const inParameter = request.params.subscriptionType; // request parameter
        const data = edao.retrieveBySub(inParameter); // call data access layer
        // validateModel('Employees', response)
        // console.log(`data =  ${JSON.stringify(data)}`);
        response.send(data);
    }
    /**
     * @swagger
     * /employees:
     *   post:
     *     description: Create a new employee
     *     tags:
     *       - employees
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: employee
     *         description: employee object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Employee'
     *     responses:
     *       200:
     *         description: new employee
     *         schema:
     *           $ref: '#/definitions/Employee'
    */
    postEmpRequest(request, response, next) {
        swagger_1.validateModel('Employee', request.body);
        // const data = edao.create(request.body)
        // validateModel('Employee', response)
        // response.send(data);
    }
}
exports.default = EmployeeController;
