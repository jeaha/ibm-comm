import * as express from 'express';
import DaoSingleton from '../daos/DaoSingleton'
import EmployeesMemoryDAO from '../daos/employees-memory-dao'
import { validateModel } from './swagger';

// To access employee data manager
const edao: EmployeesMemoryDAO = DaoSingleton.getEmployeeDAOInstance('memory');

// employee controller: context root and router
class EmployeeController {
  public path: string;  // context root
  public router: express.Router;

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
  public getAllEmployee (request: express.Request, response: express.Response,
    next: express.NextFunction) {
    const data = edao.retrieveAll()  // call data access layer
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
  public getEmpBySubscription (request: express.Request, response: express.Response,
              next: express.NextFunction) {
    const inParameter: string = request.params.subscriptionType;  // request parameter
    const data = edao.retrieveBySub(inParameter)  // call data access layer
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
 public postEmpRequest (request: express.Request, response: express.Response,
    next: express.NextFunction) {
    validateModel('Employee', request.body)
    // const data = edao.create(request.body)
    // validateModel('Employee', response)
    // response.send(data);
  }
}
 
export default EmployeeController;