"use strict";
/**
 * API Definition of Employee
 * @swagger
 * definitions:
 *   Employee:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - location
 *       - role
 *       - department
 *       - subscription
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       location:
 *         type: string
 *       role:
 *         type: string
 *       department:
 *         type: string
 *       subscription:
 *         type: string
 *   Employees:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Employee'
 */
Object.defineProperty(exports, "__esModule", { value: true });
// subscriptionType should be same as categorytype in headlines
var jobRoleType;
(function (jobRoleType) {
    jobRoleType["manager"] = "manager";
    jobRoleType["programmer"] = "programmer";
    jobRoleType["supplement"] = "supplement";
    jobRoleType["admin"] = "admin";
})(jobRoleType = exports.jobRoleType || (exports.jobRoleType = {}));
class Employee {
    constructor(inProfile) {
        this.employee = inProfile;
    }
}
exports.Employee = Employee;
