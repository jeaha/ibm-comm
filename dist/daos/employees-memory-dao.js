"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
const employee_model_1 = require("../models/employee-model");
const csv = require("csvtojson");
const inputFile = './resources/employees10.txt';
// Access to employee data:
// TODO: need to read from the text file  
class EmployeesMemoryDAO {
    constructor() {
        this.employeeRecords = new Array();
        this.loadData(inputFile);
    }
    createEmployee(line) {
        const lineArr = line.split(',');
        const inProfile = {
            id: +lineArr[0],
            name: lineArr[1],
            location: lineArr[2],
            role: lineArr[3],
            department: lineArr[4],
            subscription: lineArr[5]
        };
        this.employeeRecords.push(new employee_model_1.Employee(inProfile));
    }
    createEmployeeWithProfile(inProf) {
        // console.log(`id = ${inProf}`);
        this.employeeRecords.push(new employee_model_1.Employee(inProf));
    }
    loadData(inputDataFile) {
        //   // to json  [{"id":"728510","name":..},{},{}...]
        //   csv()
        //   .fromFile(inputDataFile)
        //   .then((jsonObj)=>{
        //       console.log(`csv to json obj ${JSON.stringify(jsonObj)}`);
        //   })
        csv({ output: "line" })
            .fromFile(inputDataFile)
            .subscribe((csvLine) => {
            this.createEmployee(csvLine);
        });
    }
    retrieveAll() {
        return Array.from(this.employeeRecords.values());
    }
    retrieveBySub(inSub) {
        let subSet = this.employeeRecords.filter(emp => {
            const recSub = emp.employee.subscription;
            // console.log(`first = ${recSub}`);
            // console.log(`inSub = ${inSub}`);
            return recSub == inSub;
            // return recSub.toLowerCase == inSub.toLowerCase;
        });
        return subSet;
    }
}
exports.default = EmployeesMemoryDAO;
