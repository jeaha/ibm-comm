import * as express from 'express';
import DaoSingleton from '../daos/DaoSingleton'
import HeadlinesMemoryDAO from '../daos/headlines-memory-dao'
import EmployeesMemoryDAO from '../daos/employees-memory-dao'
import { validateModel } from './swagger';

// To access employee and headline data manager
const hldao: HeadlinesMemoryDAO = DaoSingleton.getHeadlineDAOInstance('memory');
const ehldao: EmployeesMemoryDAO = DaoSingleton.getEmployeeDAOInstance('memory');

class HeadLineController {
  public path: string; // context root
  public router: express.Router;  // router

  constructor() {
    this.path = '/headlines'
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
 
  public getAllHeadlines (request: express.Request, response: express.Response,
                          next: express.NextFunction) {
    const data = hldao.retrieveAll()   // call data access layer
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
  public getHLByCategory (request: express.Request, response: express.Response,
                        next: express.NextFunction) {
    const inParameter: string = request.params.category;  // request parameter
    const data = hldao.retrieveByCat(inParameter)  // call data access layer
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
  public getHLByDate (request: express.Request, response: express.Response,
                        next: express.NextFunction) {
    const inParameter: string = request.params.date;  // request parameter
    const data = hldao.retrieveByDate(inParameter)  // call data access layer
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
  public getRecommendsByDate (request: express.Request, response: express.Response,
                              next: express.NextFunction) {
    const inParameter1: string = request.params.date;  // request parameter: date
    const inParameter2: string = request.params.category;  // request parameter: subscription
    // Compute headlines matching a specifice date
    const headlines = hldao.retrieveByDate(inParameter1)  
    // Compute employees subscribe to a specific category
    const employees = ehldao.retrieveBySub(inParameter2)  

    // Compute headlies subscribed by each employee for specified date
    // console.log(`date =  ${inParameter1}  category =  ${inParameter2}`);
    const data = hldao.recommend(headlines, employees)  // call healdine data access layer
    // validateModel('Headlines', response)
    // console.log(`data =  ${JSON.stringify(data)}`);
    response.send(data);
  }

}

export default HeadLineController;
