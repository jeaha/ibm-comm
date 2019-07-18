import HeadlinesMemoryDAO from './headlines-memory-dao'
import EmployeesMemoryDAO from './employees-memory-dao'

class DaoSingleton {
    private static hlMemoryDAO: HeadlinesMemoryDAO;
    private static eMemoryDAO: EmployeesMemoryDAO;

    constructor() {
    }

    public static getHeadlineDAOInstance(type: string) {
        if (type === 'memory') {
            if (!DaoSingleton.hlMemoryDAO) {
                DaoSingleton.hlMemoryDAO = new HeadlinesMemoryDAO()
            }
            return DaoSingleton.hlMemoryDAO
        }
        throw new Error('Unknown DAO type ' + type)
    }
    
    public static getEmployeeDAOInstance(type: string) {
        if (type === 'memory') {
            if (!DaoSingleton.eMemoryDAO) {
                DaoSingleton.eMemoryDAO = new EmployeesMemoryDAO()
            }
            return DaoSingleton.eMemoryDAO
        }
    }
}

export default DaoSingleton;
