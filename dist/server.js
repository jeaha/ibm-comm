"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headlines_1 = require("./api/headlines");
const employees_1 = require("./api/employees");
const app_1 = require("./app");
const port = 5000;
const app = new app_1.default([
    new headlines_1.default(),
    new employees_1.default(),
], port);
app.listen();
console.log('Server started on port ' + port);
