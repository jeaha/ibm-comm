import HeadLineController from './api/headlines';
import EmployeeController from './api/employees';
import App from './app';

const port = 5000
const app = new App(
    [
      new HeadLineController(),
      new EmployeeController(),
    ],
    port,
);

app.listen();
console.log('Server started on port ' + port)
