"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
const headline_model_1 = require("../models/headline-model");
const csv = require("csvtojson");
const moment = require("moment");
const inputFile = './resources/headlines10.txt';
// const ehldao: EmployeesMemoryDAO = DaoSingleton.getEmployeeDAOInstance('memory');
// Access to Headline data:
class HeadlinesMemoryDAO {
    constructor() {
        this.headlineRecords = new Array();
        this.loadData(inputFile); // load headlines from the file at initialization
    }
    createHeadline(line) {
        const lineArr = line.split(',');
        const inAttributes = {
            title: lineArr[0],
            abstract: lineArr[1],
            language: lineArr[2],
            date: lineArr[3],
            author: lineArr[4],
            category: lineArr[5]
        };
        this.headlineRecords.push(new headline_model_1.Headline(inAttributes));
    }
    createHeadlineWithAttributes(inProf) {
        // console.log(`id = ${inProf}`);
        this.headlineRecords.push(new headline_model_1.Headline(inProf));
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
            this.createHeadline(csvLine);
        });
    }
    retrieveAll() {
        return Array.from(this.headlineRecords.values());
    }
    retrieveByCat(inCat) {
        let subSet = this.headlineRecords.filter(hl => {
            const recCat = hl.headline.category;
            return recCat == inCat;
            // return recCat.toLowerCase == inCat.toLowerCase;
        });
        return subSet;
    }
    retrieveByDate(inDate) {
        const inConvertDate = moment(inDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
        const inDateForm = new Date(inConvertDate);
        let subSet = this.headlineRecords.filter(hl => {
            const recConvertDate = moment(hl.headline.date, 'MM/DD/YYYY').format('YYYY-MM-DD');
            let recDateForm = new Date(recConvertDate);
            return recDateForm.valueOf() == inDateForm.valueOf();
        });
        return subSet;
    }
    recommend(inHL, inEmp) {
        // console.log(`headlines =  ${JSON.stringify(inHL)}`);
        // console.log(`employees =  ${JSON.stringify(inEmp)}`);
        const resSet = new Map();
        inEmp.forEach(function (emp) {
            // console.log(`emp =  ${JSON.stringify(emp)}`);
            inHL.forEach(function (hl) {
                if (emp.employee.subscription == hl.headline.category) {
                    resSet.set(emp.employee.id, hl);
                }
            });
        });
        return Array.from(resSet);
    }
}
exports.default = HeadlinesMemoryDAO;
