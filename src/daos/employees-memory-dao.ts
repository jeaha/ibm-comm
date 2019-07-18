import "core-js";
import { Employee, Profile } from '../models/employee-model'
import * as csv from'csvtojson';

const inputFile='./resources/employees10.txt';

// Access to employee data:
// TODO: need to read from the text file  
class EmployeesMemoryDAO {
	public employeeRecords: Array<Employee>;

  constructor () {
    this.employeeRecords = new Array<Employee>()
    this.loadData(inputFile)

  }

  createEmployee(line: string) {
    const lineArr = line.split(',');
    const inProfile: Profile = {
      id: +lineArr[0],
      name: lineArr[1],
      location: lineArr[2],
      role: lineArr[3],
      department: lineArr[4],
      subscription: lineArr[5]
    }

    this.employeeRecords.push(new Employee(inProfile))
  }

  createEmployeeWithProfile(inProf: Profile) {
    // console.log(`id = ${inProf}`);
    this.employeeRecords.push(new Employee(inProf))
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
      this.createEmployee(csvLine);
    })
  }

  retrieveAll () {
    return Array.from(this.employeeRecords.values())
  }

  retrieveBySub (inSub: string) {
    let subSet = this.employeeRecords.filter(emp => {
      const recSub: string = emp.employee.subscription;
      // console.log(`first = ${recSub}`);
      // console.log(`inSub = ${inSub}`);
      return recSub == inSub;
      // return recSub.toLowerCase == inSub.toLowerCase;
    });
    return subSet;
  }


  // create (e: Profile) {
  //   if (this.employeeRecords.has(e.id)) {
  //     throw new Error(`An employee with id ${e.id} already exists`)
  //   } else {
  //     this.createEmployeeWithProfile(e)
  //     return this.retrieve(e.id)
  //   }
  // }
}

export default EmployeesMemoryDAO;
