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

// subscriptionType should be same as categorytype in headlines

export enum jobRoleType {
  manager = "manager",
  programmer = "programmer",
  supplement = "supplement",
  admin = "admin"
}

export interface Profile {
	id: number,
	name: string,
	location: string,
	role: string,
	department: string,
	subscription: string
}


export class Employee {
	public employee: Profile;

  constructor (inProfile: Profile) {
    this.employee = inProfile
  }
}
  