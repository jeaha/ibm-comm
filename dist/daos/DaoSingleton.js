"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headlines_memory_dao_1 = require("./headlines-memory-dao");
const employees_memory_dao_1 = require("./employees-memory-dao");
class DaoSingleton {
    constructor() {
    }
    static getHeadlineDAOInstance(type) {
        if (type === 'memory') {
            if (!DaoSingleton.hlMemoryDAO) {
                DaoSingleton.hlMemoryDAO = new headlines_memory_dao_1.default();
            }
            return DaoSingleton.hlMemoryDAO;
        }
        throw new Error('Unknown DAO type ' + type);
    }
    static getEmployeeDAOInstance(type) {
        if (type === 'memory') {
            if (!DaoSingleton.eMemoryDAO) {
                DaoSingleton.eMemoryDAO = new employees_memory_dao_1.default();
            }
            return DaoSingleton.eMemoryDAO;
        }
    }
}
exports.default = DaoSingleton;
