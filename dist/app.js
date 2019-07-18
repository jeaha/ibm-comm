"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan"); // log
const cookieParser = require("cookie-parser"); // manage cookie expiration
const swagger_1 = require("./api/swagger");
class App {
    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        this.app.use('/api/docs', swagger_1.swaggerRouter);
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
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
        this.app.on('error', this.onError);
        this.app.on('listening', this.onListening);
    }
    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof this.port === 'string'
            ? 'Pipe ' + this.port
            : 'Port ' + this.port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
            default:
                throw error;
        }
    }
    onListening() {
        const addr = 'localhost';
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + this.port;
        console.log('\nListening on ' + bind);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
