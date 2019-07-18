import "core-js";
import { Headline, Attributes, languageType, categoryType } from '../models/headline-model'
import { Employee, Profile } from '../models/employee-model'
import * as csv from'csvtojson';
import * as moment from 'moment';

const inputFile='./resources/headlines10.txt';
// const ehldao: EmployeesMemoryDAO = DaoSingleton.getEmployeeDAOInstance('memory');

// Access to Headline data:
class HeadlinesMemoryDAO {
	public headlineRecords: Array<Headline>;

  constructor () {
    this.headlineRecords = new Array<Headline>()
    this.loadData(inputFile)  // load headlines from the file at initialization

  }

  createHeadline(line: string) {
    const lineArr = line.split(',');
    const inAttributes: Attributes = {
      title: lineArr[0],
      abstract: lineArr[1],
      language: lineArr[2],
      date: lineArr[3],
      author: lineArr[4],
      category: lineArr[5]
    }

    this.headlineRecords.push(new Headline(inAttributes))
  }

  createHeadlineWithAttributes(inProf: Attributes) {
    // console.log(`id = ${inProf}`);
    this.headlineRecords.push(new Headline(inProf))
  }

  loadData (inputDataFile: any) {
  //   // to json  [{"id":"728510","name":..},{},{}...]
  //   csv()
  //   .fromFile(inputDataFile)
  //   .then((jsonObj)=>{
  //       console.log(`csv to json obj ${JSON.stringify(jsonObj)}`);
  //   })

    csv({output:"line"})
    .fromFile(inputDataFile)
    .subscribe((csvLine)=>{ 
      this.createHeadline(csvLine);
    })
  }

  retrieveAll () {
    return Array.from(this.headlineRecords.values())
  }

  retrieveByCat (inCat: string) {
    let subSet = this.headlineRecords.filter(hl => {
      const recCat: string = hl.headline.category;
      return recCat == inCat;
      // return recCat.toLowerCase == inCat.toLowerCase;
    });
    return subSet;
  }

  retrieveByDate (inDate: string) {
    const inConvertDate =  moment(inDate,'MM/DD/YYYY').format('YYYY-MM-DD');
    const inDateForm = new Date(inConvertDate);
    let subSet = this.headlineRecords.filter(hl => {
      const recConvertDate =  moment(hl.headline.date,'MM/DD/YYYY').format('YYYY-MM-DD');
      let recDateForm = new Date(recConvertDate);
        return recDateForm.valueOf() == inDateForm.valueOf();
    });
    return subSet;
  }

  recommend (inHL: Array<Headline>, inEmp: Array<Employee>) {
    // console.log(`headlines =  ${JSON.stringify(inHL)}`);
    // console.log(`employees =  ${JSON.stringify(inEmp)}`);
    const resSet: Map<number, Headline> = new Map<number, Headline>()

    inEmp.forEach(function (emp) {
      // console.log(`emp =  ${JSON.stringify(emp)}`);
      inHL.forEach(function (hl) {
        if (emp.employee.subscription == hl.headline.category) {
          resSet.set(emp.employee.id, hl)
        }
      });
    });
    return Array.from(resSet);
  }
}

export default HeadlinesMemoryDAO;
