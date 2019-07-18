import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';  // log
import * as cookieParser from 'cookie-parser';  // manage cookie expiration
import { swaggerRouter } from './api/swagger';
import HeadLineController from './api/headlines';
import EmployeeController from './api/employees';

class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers, port) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use('/api/docs', swaggerRouter);
    this.app.use(logger('dev'))
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    // this.app.use(function (request: express.Request, response: express.Response, next) {
    //     var err = new Error('Not Found')
    //     response.status(404);
    //     next(err)
    // })    
    // this.app.use(function (err, request: express.Request, response: express.Response, next) {
    //     console.error(`Error catched! ${err}`)
    //     const error = {
    //       status: err.status || 500,
    //       message: err.message
    //     }
    //     response.status(error.status).send(error)
    // })
    this.app.on('error', this.onError)
    this.app.on('listening', this.onListening)
  }

  public onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }
  
    const bind = typeof this.port === 'string'
          ? 'Pipe ' + this.port
          : 'Port ' + this.port
  
      // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
      default:
        throw error
    }
  }

  public onListening () {
    const addr = 'localhost'
    const bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + this.port
    console.log('\nListening on ' + bind)
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;