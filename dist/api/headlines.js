"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DaoSingleton_1 = require("../daos/DaoSingleton");
// To access employee and headline data manager
const hldao = DaoSingleton_1.default.getHeadlineDAOInstance('memory');
const ehldao = DaoSingleton_1.default.getEmployeeDAOInstance('memory');
class HeadLineController {
    constructor() {
        this.path = '/headlines';
        this.router = express.Router();
        this.init();
    }
    // Take each handler, and attach to one of the Express.Router's endpoints.
    init() {
        this.router.get('/', this.getAllHeadlines);
        this.router.get('/category/:category', this.getHLByCategory);
        this.router.get('/date/:date', this.getHLByDate);
        this.router.get('/date/:date/category/:category', this.getRecommendsByDate);
    }
    /**
     * @swagger
     * /headlines:
     *   get:
     *     description: Retrieve the all headlines
     *     tags:
     *       - headlines
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: published headlines
     *         schema:
     *           $ref: '#/definitions/Headlines'
    */
    getAllHeadlines(request, response, next) {
        const data = hldao.retrieveAll(); // call data access layer
        // validateModel('Headlines', response)
        response.send(data);
    }
    /**
     * @swagger
     * /headlines/category/{category}:
     *   get:
     *     description: Retrieve a list of headlines matching the specified category
     *     tags:
     *       - headlines
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: category
     *         description: Specify headline category
     *         in: path
     *         required: true
     *     responses:
     *       200:
     *         description: matching headlines
     *         schema:
     *           $ref: '#/definitions/Headlines'
    */
    getHLByCategory(request, response, next) {
        const inParameter = request.params.category; // request parameter
        const data = hldao.retrieveByCat(inParameter); // call data access layer
        // validateModel('Headlines', response)
        response.send(data);
    }
    /**
     * @swagger
     * /headlines/date/{date}:
     *   get:
     *     description: Retrieve a list of headlines matching the specified date
     *     tags:
     *       - headlines
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: date
     *         description: Specify headline date
     *         in: path
     *         required: true
     *     responses:
     *       200:
     *         description: matching headlines
     *         schema:
     *           $ref: '#/definitions/Headlines'
    */
    getHLByDate(request, response, next) {
        const inParameter = request.params.date; // request parameter
        const data = hldao.retrieveByDate(inParameter); // call data access layer
        // validateModel('Headlines', response)
        // console.log(`data =  ${JSON.stringify(data)}`);
        response.send(data);
    }
    /**
     * @swagger
     * /headlines/date/{date}/category/{category}:
     *   get:
     *     description: Retrieve a list of employees matching headlines
     *     tags:
     *       - headlines
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: date
     *         description: Specify headline date
     *         in: path
     *         required: true
     *       - name: category
     *         description: Specify category
     *         in: path
     *         required: true
     *     responses:
     *       200:
     *         description: matching employees
     *         schema:
     *           $ref: '#/definitions/Employees'
    */
    getRecommendsByDate(request, response, next) {
        const inParameter1 = request.params.date; // request parameter: date
        const inParameter2 = request.params.category; // request parameter: subscription
        // Compute headlines matching a specifice date
        const headlines = hldao.retrieveByDate(inParameter1);
        // Compute employees subscribe to a specific category
        const employees = ehldao.retrieveBySub(inParameter2);
        // Compute headlies subscribed by each employee for specified date
        // console.log(`date =  ${inParameter1}  category =  ${inParameter2}`);
        const data = hldao.recommend(headlines, employees); // call healdine data access layer
        // validateModel('Headlines', response)
        // console.log(`data =  ${JSON.stringify(data)}`);
        response.send(data);
    }
}
exports.default = HeadLineController;
